import { EventBus, Listeners } from '../EventBus/index.js';
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

export interface BlockClass {
    new(parentElement: HTMLElement, props: Props, children?: Children)
}

export interface Children {
    [blockName: string]: {
        blockConstructor: BlockClass,
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
    private readonly _domListeners: Listeners;
    private _parentElement: HTMLElement;
    private readonly eventBus: EventBus;
    props: TProps;
    childBlocks: ChildBlocks;
    slots: { [blockName: string]: HTMLElement }

    constructor(parentElement: HTMLElement, props: TProps, children?: Children, tagName?: string) {
        this.eventBus = new EventBus();

        this._parentElement = parentElement;
        this.props = this._makePropsProxy(props);
        this.slots = {};
        this.childBlocks = {};
        this._domListeners = {};
        if (children) {
            // создаем компоненты детей
            for(let [blockName, {blockConstructor, blockProps, children: subChildren}] of Object.entries(children)) {
                // Создаем слот-wrapper (пустой HTMLElement) для монтирования ребенка
                this.slots[blockName] = createBlockDocumentElement(blockName, tagName);

                // создаем компонент ребенка и сохраняем на него ссылку
                this.childBlocks[blockName] = new blockConstructor(this.slots[blockName], blockProps as TProps, subChildren);
            }
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

    public setProps (nextProps: object) {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    reconnectBlockWithDom(block: Block<object>) {
        if (block._parentElement.dataset.blockId) {
            // Ищем родителя в DOM
            const parentFromDom: HTMLElement = document.querySelector(`[data-block-id="${block._parentElement.dataset.blockId}"]`);
            if (parentFromDom && !isInDom(block._parentElement)) {
                block.detachListenersFromElement(block._parentElement);
                block._parentElement = parentFromDom;
                block.attachListenersToElement(block._parentElement);
            }
        }
    }

    reconnectChildrenSlotsWithDom() {
        for(let [blockName, blockObj] of Object.entries(this.childBlocks)) {
            this.reconnectBlockWithDom(blockObj);
            this.slots[blockName] = blockObj._parentElement;
        }
    }

    removeFromDom() {
        if (this._parentElement.dataset.blockId) {
            // Ищем родителя в DOM
            const parentFromDom: HTMLElement = document.querySelector(`[data-block-id="${this._parentElement.dataset.blockId}"]`);
            if (parentFromDom) {
                this.detachListenersFromElement(this._parentElement);
                parentFromDom.parentElement.removeChild(parentFromDom);
            }
        }
    }

    togglePopup(isShow: boolean, cssSelector: string) {
        //TODO: заменить на блок Modal
        const popupEl = document.querySelector(cssSelector) as HTMLElement;
        popupEl.style.display = isShow ? 'block' : 'none';
    }

    public forceRender() {
        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }

    private _render() {
        this.reconnectBlockWithDom(this);
        this.reconnectChildrenSlotsWithDom();
        this.detachListenersFromElement(this._parentElement);
        this._parentElement.innerHTML = this.render();
        this.attachListenersToElement(this._parentElement);
        this.reconnectChildrenSlotsWithDom();
        this.reconnectBlockWithDom(this);
        if (!this._parentElement.dataset.blockId) {
            // Ищем всех  компонент-детей в DOM
            const childBlocksFromDom: NodeListOf<HTMLElement> = document.querySelectorAll(`[data-block-id]`);
            this.checkAllBlocksTree(this, childBlocksFromDom);
        }

        if ((<Props>this.props).isHidden === true) {
            this.makeHtmlElementHidden();
        } else if ((<Props>this.props).isHidden === false) {
            this.makeHtmlElementVisible();
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
        return <HTMLElement>this._parentElement;
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
        this.setProps({ isHidden: false });
    }

    private makeHtmlElementVisible() {
        show(this._parentElement);
    }

    public hide() {
        this.setProps({ isHidden: true });
    }

    private makeHtmlElementHidden() {
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
            if (eventName.target.matches(cssSelector)
                || (cssSelector === 'a' && eventName.target.parentElement.matches(cssSelector))
                || (cssSelector === 'a' && eventName.target.parentElement.parentElement.matches(cssSelector))
            ) {
                callback(eventName);
            }
        };

        parent.addEventListener(event, fn);

        if (!this._domListeners[event]) {
            this._domListeners[event] = [];
        }
        this._domListeners[event].push(fn);// {el: parent, fn}

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