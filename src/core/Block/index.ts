import { EventBus } from "../EventBus/index.js";
import { createBlockDocumentElement, hide, isInDom, show } from '../../utils/dom.js';


enum EVENTS {
    INIT = "init",
    FLOW_CDM = "flow:component-did-mount",
    FLOW_RENDER = "flow:render",
    FLOW_CDU = "flow:component-did-update",
}

export interface Props {
    stylesBefore?: string,
    stylesAfter?: string,
    hasText?: string,
    attrs?: string,
    wrapperStyles?: string,
    isHidden?: boolean,
}

export interface Children {
    [blockName: string]: {
        blockConstructor: { new (parentElement: HTMLElement, props: unknown, children?: Children) },
        blockProps: unknown,
        children?: Children
    }
}

export interface ChildBlocks {
    [blockName: string]: Block<object>
}

// Стратегия монтирования: компоненту предоставляется parent: HTMLElement,
// куда он должен монтировать себя сам
export abstract class Block<TProps extends object> {
    private readonly _element: HTMLElement;
    private _parentElement: HTMLElement;
    private readonly eventBus: EventBus;
    props: TProps;
    childBlocks: ChildBlocks;
    slots: { [blockName: string]: HTMLElement }

    constructor(parentElement: HTMLElement, props?: TProps, children?: Children){
        this.eventBus = new EventBus();

        // this._element = createDocumentElement(tagName);
        this._parentElement = parentElement;
        this.props = this._makePropsProxy(props);
        this.slots = {};
        this.childBlocks = {};
        if(children) {
            // создаем компоненты детей
            Object.keys(children).forEach((blockName: string) => {
                const { blockConstructor, blockProps, children: subChildren} = children[blockName];

                // Создаем слот-wrapper (пустой HTMLElement) для монтирования ребенка
                // TODO: для наглядности и дебага слотом будет div-обертка.
                //  В будущем подумать над заменой на что-то типа <template> или DocumentFragment
                this.slots[blockName] = createBlockDocumentElement(blockName);

                // создаем компонент ребенка и сохраняем на него ссылку
                this.childBlocks[blockName] = new blockConstructor(this.slots[blockName], blockProps, subChildren);
            })
        }

        this._registerEvents(this.eventBus);
        this.eventBus.emit(EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(EVENTS.INIT, this.init.bind(this));
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    public init(): void {
        this.eventBus.emit(EVENTS.FLOW_CDM);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }

    public componentDidMount(): void {}

    private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
        let hasUpdate = false;
        for(let prop in newProps) {
            if(newProps[prop] !== oldProps[prop]){
                hasUpdate = true;
                break;
            }
        }
        const response = this.componentDidUpdate(oldProps, newProps);
        if(response && hasUpdate) {
            this.eventBus.emit(EVENTS.FLOW_RENDER);
            return true;
        }
        return false;
    }

    public componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
        return true;
    }

    public setProps = (nextProps: object) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    private _render() {
        if(this._parentElement.dataset.blockId) {
            // Ищем родителя в DOM
            const parentFromDom: HTMLElement = document.querySelector(`[data-block-id="${this._parentElement.dataset.blockId}"]`);
            if (parentFromDom && !isInDom(this._parentElement)) {
                this._parentElement = parentFromDom;
            }
        }
        this._parentElement.innerHTML = this.render();
        if((<Props>this.props).isHidden) {
            this.hide();
        }
    }

    public abstract render(): string;

    public getContent(): HTMLElement {
        // Берем только содержание, без вспомогательного елемента-враппера
        return <HTMLElement>this._parentElement;//.children[0];
    }

    private _makePropsProxy(props: TProps): TProps {
        const self = this;

        const proxyProps = new Proxy(props, {

            set(target: TProps, prop: string, val: any): boolean {
                if(target[prop] === val) {
                    return false;
                }
                const oldPropVal = target[prop];
                target[prop] = val;
                self.eventBus.emit(EVENTS.FLOW_CDU, { [prop] : oldPropVal}, { [prop] : val});
                return true;
            },

            deleteProperty(): never {
                throw new Error("Нет доступа");
            }
        });

        return proxyProps;
    }

    public show() {
        show(this._parentElement);
    }

    public hide() {
        hide(this._parentElement);
    }
}