import { EventBus, Listeners } from '../EventBus/index';
import {
    createBlockDocumentElement, hide, isInDom, preventEvent, show,
} from '../../utils/dom';

// eslint-disable-next-line no-shadow
enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_RENDER = 'flow:render',
    FLOW_CDU = 'flow:component-did-update',
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
    private readonly domListeners: Listeners;

    private parentElement: HTMLElement;

    private readonly eventBus: EventBus;

    props: TProps;

    childBlocks: ChildBlocks;

    slots: { [blockName: string]: HTMLElement }

    constructor(parentElement: HTMLElement, props: TProps, children?: Children, tagName?: string) {
        this.eventBus = new EventBus();

        this.parentElement = parentElement;
        this.props = this.makePropsProxy(props);
        this.slots = {};
        this.childBlocks = {};
        this.domListeners = {};
        if (children) {
            // создаем компоненты детей
            for (const [blockName, { blockConstructor, blockProps, children: subChildren }] of Object.entries(children)) {
                // Создаем слот-wrapper (пустой HTMLElement) для монтирования ребенка
                this.slots[blockName] = createBlockDocumentElement(blockName, tagName);

                // создаем компонент ребенка и сохраняем на него ссылку
                // eslint-disable-next-line new-cap
                this.childBlocks[blockName] = new blockConstructor(this.slots[blockName], blockProps as TProps, subChildren);
            }
        }

        this.registerEvents(this.eventBus);
        this.eventBus.emit(EVENTS.INIT);
    }

    private registerEvents(eventBus: EventBus): void {
        eventBus.on(EVENTS.INIT, this.init.bind(this));
        /* eslint-disable no-underscore-dangle */
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
        /* eslint-enable no-underscore-dangle */
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
        for (const prop in newProps) {
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

    public setProps(nextProps: object) {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    reconnectBlockWithDom(block: Block<object>) {
        const parentBlockId = block.parentElement.getAttribute('data-block-id');
        if (parentBlockId) {
            // Ищем родителя в DOM
            const parentFromDom: HTMLElement = document.querySelector(`[data-block-id="${parentBlockId}"]`);
            if (parentFromDom && !isInDom(block.parentElement)) {
                block.detachListenersFromElement(block.parentElement);
                block.parentElement = parentFromDom;
                block.attachListenersToElement(block.parentElement);
            }
        }
    }

    reconnectChildrenSlotsWithDom() {
        for (const [blockName, blockObj] of Object.entries(this.childBlocks)) {
            this.reconnectBlockWithDom(blockObj);
            this.slots[blockName] = blockObj.parentElement;
        }
    }

    removeFromDom() {
        const parentBlockId = this.parentElement.getAttribute('data-block-id');
        if (parentBlockId) {
            // Ищем родителя в DOM
            const parentFromDom: HTMLElement = document.querySelector(`[data-block-id="${parentBlockId}"]`);
            if (parentFromDom) {
                this.detachListenersFromElement(this.parentElement);
                parentFromDom.parentElement.removeChild(parentFromDom);
            }
        }
    }

    togglePopup(isShow: boolean, cssSelector: string) {
        // TODO: заменить на блок Modal
        const popupEl = document.querySelector(cssSelector) as HTMLElement;
        popupEl.style.display = isShow ? 'block' : 'none';
    }

    public forceRender() {
        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }

    private _render() {
        this.reconnectBlockWithDom(this);
        this.reconnectChildrenSlotsWithDom();
        this.detachListenersFromElement(this.parentElement);
        this.beforeRender();
        this.parentElement.innerHTML = this.render();
        this.afterRender();
        this.attachListenersToElement(this.parentElement);
        this.reconnectChildrenSlotsWithDom();
        this.reconnectBlockWithDom(this);
        const parentBlockId = this.parentElement.getAttribute('data-block-id');
        if (!parentBlockId) {
            // Ищем всех  компонент-детей в DOM
            const childBlocksFromDom: NodeListOf<HTMLElement> = document.querySelectorAll('[data-block-id]');
            this.checkAllBlocksTree(this, childBlocksFromDom);
        }

        if ((<Props> this.props).isHidden === true) {
            this.makeHtmlElementHidden();
        } else if ((<Props> this.props).isHidden === false) {
            this.makeHtmlElementVisible();
        }
    }

    checkAllBlocksTree(block: Block<Props>, nodesFromDom: NodeListOf<HTMLElement>) {
        if (Object.keys(block.childBlocks).length) {
            Object.keys(block.childBlocks).map((blockName) => {
                this.checkAllBlocksTree(block.childBlocks[blockName], nodesFromDom);
            });
        }
        nodesFromDom.forEach((node) => {
            const nodeBlockId = node.getAttribute('data-block-id');
            const parentBlockId = block.parentElement.getAttribute('data-block-id');
            if (nodeBlockId === parentBlockId) {
                block.detachListenersFromElement(block.parentElement);
                block.parentElement = node;
                block.attachListenersToElement(block.parentElement);
            }
        });
    }

    public beforeRender() {
    }

    public abstract render(): string;

    public afterRender() {
    }

    public getContent(): HTMLElement {
        return <HTMLElement> this.parentElement;
    }

    private makePropsProxy(props: TProps): TProps {
        const self = this;

        const proxyProps = new Proxy(props, {

            set(target: TProps, prop: string, val: any): boolean {
                if (target[prop] !== val) {
                    const oldPropVal = target[prop];
                    target[prop] = val;
                    self.eventBus.emit(EVENTS.FLOW_CDU, { [prop]: oldPropVal }, { [prop]: val });
                }
                // If the set() method returns false, and the assignment happened in strict-mode code,
                // a TypeError will be thrown.
                return true;
            },

            deleteProperty(): never {
                throw new Error('Нет доступа');
            },
        });

        return proxyProps;
    }

    public show() {
        this.setProps({ isHidden: false });
    }

    private makeHtmlElementVisible() {
        show(this.parentElement);
    }

    public hide() {
        this.setProps({ isHidden: true });
    }

    private makeHtmlElementHidden() {
        hide(this.parentElement);
    }

    public removeListener(parent: HTMLElement, event: keyof HTMLElementEventMap, callback: (any) => any): void {
        this.domListeners[event] = this.domListeners[event].filter(
            (listener) => {
                if (listener !== callback) {
                    parent.removeEventListener(event, callback);
                    return true;
                }
                return false;
            },
        );
    }

    public removeAllListenersByEvent(el: HTMLElement, event: keyof HTMLElementEventMap): void {
        this.domListeners[event].map((listener: () => {}) => el.removeEventListener(event, listener));
        this.domListeners[event] = [];
    }

    public addListener(parent: HTMLElement, eventName: keyof HTMLElementEventMap, callback: (any) => any, cssSelector: string) {
        const fn = (event) => {
            if (event.currentTarget.matches(cssSelector)
                || (cssSelector === 'a' && event.currentTarget.parentElement.matches(cssSelector))
                || (cssSelector === 'a' && event.currentTarget.parentElement.parentElement.matches(cssSelector))
            ) {
                preventEvent(event);
                callback(event);
            }
        };

        parent.addEventListener(eventName, fn);

        if (!this.domListeners[eventName]) {
            this.domListeners[eventName] = [];
        }
        this.domListeners[eventName].push(fn);// {el: parent, fn}

        return this;
    }

    public detachListenersFromElement(parent: HTMLElement): void {
        if (parent.className === 'block-wrapper') {
            const el = parent.querySelector('input,button,a');
            Object.keys(this.domListeners)
                .map((event: keyof HTMLElementEventMap) => {
                    this.domListeners[event].map((callback: () => any) => {
                        el.removeEventListener(event, callback);
                    });
                });
        }
    }

    public attachListenersToElement(parent: HTMLElement): void {
        if (parent.className === 'block-wrapper') {
            const el = parent.querySelector('input,button,a');
            Object.keys(this.domListeners)
                .map((event: keyof HTMLElementEventMap) => {
                    this.domListeners[event].map((callback: () => any) => {
                        el.addEventListener(event, callback);
                    });
                });
        }
    }
}
