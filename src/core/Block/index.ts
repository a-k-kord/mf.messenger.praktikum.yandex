import { EventBus, Listeners } from "../EventBus/index.js";
import { createBlockDocumentElement, generateId, hide, isInDom, show } from '../../utils/dom.js';


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
        blockConstructor: { new(parentElement: HTMLElement, props: unknown, children?: Children) },
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
    private readonly _domListeners: Listeners;
    private _parentElement: HTMLElement;
    private readonly eventBus: EventBus;
    props: TProps;
    childBlocks: ChildBlocks;
    slots: { [blockName: string]: HTMLElement }

    constructor(parentElement: HTMLElement, props?: TProps, children?: Children, tagName?: string) {
        this.eventBus = new EventBus();

        this._parentElement = parentElement;
        this.props = this._makePropsProxy(props);
        this.slots = {};
        this.childBlocks = {};
        this._domListeners = {};
        if (children) {
            // создаем компоненты детей
            Object.keys(children).forEach((blockName: string) => {
                const {blockConstructor, blockProps, children: subChildren} = children[blockName];

                // Создаем слот-wrapper (пустой HTMLElement) для монтирования ребенка
                // TODO: для наглядности и дебага слотом будет div-обертка.
                //  В будущем подумать над заменой на что-то типа <template> или DocumentFragment
                this.slots[blockName] = createBlockDocumentElement(blockName, tagName);

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

    public componentDidMount(): void {
    }

    private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
        let hasUpdate = false;
        for (let prop in newProps) {
            if (newProps[prop] !== oldProps[prop]) {
                hasUpdate = true;
                break;
            }
        }
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response && hasUpdate) {
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

    reconnectWithDom() {
        if (this._parentElement.dataset.blockId) {
            // Ищем родителя в DOM
            const parentFromDom: HTMLElement = document.querySelector(`[data-block-id="${this._parentElement.dataset.blockId}"]`);
            if (parentFromDom && !isInDom(this._parentElement)) {
                this.detachListenersFromElement(this._parentElement);
                this._parentElement = parentFromDom;
                this.attachListenersToElement(this._parentElement);
            }
        }
    }

    private _render() {
        this.reconnectWithDom();
        this._parentElement.innerHTML = this.render();
        this.reconnectWithDom();
        if (!this._parentElement.dataset.blockId) {
            // Ищем всех  компонент-детей в DOM
            const childBlocksFromDom: NodeListOf<HTMLElement> = document.querySelectorAll(`[data-block-id]`);
            this.checkAllBlocksTree(this, childBlocksFromDom);
        }

        if ((<Props>this.props).isHidden === true) {
            this.hide();
        } else if((<Props>this.props).isHidden === false){
            this.show();
        }
    }

    checkAllBlocksTree(block: Block<Props>, nodesFromDom: NodeListOf<HTMLElement>) {
        if (Object.keys(block.childBlocks).length) {
            Object.keys(block.childBlocks).map(blockName => {
                this.checkAllBlocksTree(block.childBlocks[blockName], nodesFromDom);
            });
        }
        nodesFromDom.forEach((node) => {
            if (node.dataset.blockId === block._parentElement.dataset.blockId) {
                block.detachListenersFromElement(block._parentElement);
                block._parentElement = node;
                block.attachListenersToElement(block._parentElement);
            }
        });

    }

    public abstract render(): string;

    public getContent(): HTMLElement {
        return <HTMLElement>this._parentElement;//.children[0];
    }

    private _makePropsProxy(props: TProps): TProps {
        const self = this;

        const proxyProps = new Proxy(props, {

            set(target: TProps, prop: string, val: any): boolean {
                if (target[prop] !== val) {
                    const oldPropVal = target[prop];
                    target[prop] = val;
                    self.eventBus.emit(EVENTS.FLOW_CDU, {[prop]: oldPropVal}, {[prop]: val});
                }
                return true; // If the set() method returns false, and the assignment happened in strict-mode code, a TypeError will be thrown.
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

    public removeListener(parent: HTMLElement, event: keyof HTMLElementEventMap, callback: (any) => any): void {
        this._domListeners[event] = this._domListeners[event].filter(
            listener => {
                if (listener !== callback) {
                    parent.removeEventListener(event, callback);
                    return true;
                }
                return false;
            }
        );
    }

    public addListener(parent: HTMLElement, event: keyof HTMLElementEventMap, callback: (any) => any, cssSelector) {
        const fn = eventName => {
            if (!eventName.target.matches(cssSelector)) {
                return;
            }

            callback(eventName);
        };

        parent.addEventListener(event, fn);

        if (!this._domListeners[event]) {
            this._domListeners[event] = [];
        }
        this._domListeners[event].push(fn);

        return this;
    }

    public detachListenersFromElement(parent: HTMLElement): void {
        const el = parent.querySelector('input,button,a');
        Object.keys(this._domListeners).map((event: keyof HTMLElementEventMap) => {
            this._domListeners[event].map((callback: () => any) => {
                el.removeEventListener(event, callback);
            })
        });
    }

    public attachListenersToElement(parent: HTMLElement): void {
        const el = parent.querySelector('input,button,a');
        Object.keys(this._domListeners).map((event: keyof HTMLElementEventMap) => {
            this._domListeners[event].map((callback: () => any) => {
                el.addEventListener(event, callback);
            })
        });
    }
}