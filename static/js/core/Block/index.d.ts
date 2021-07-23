export interface Props {
    stylesBefore?: string;
    stylesAfter?: string;
    hasText?: string;
    attrs?: string;
    wrapperStyles?: string;
    isHidden?: boolean;
}
export interface BlockClass {
    new (parentElement: HTMLElement, props: Props, children?: Children): any;
}
export interface Children {
    [blockName: string]: {
        blockConstructor: BlockClass;
        blockProps: unknown;
        children?: Children;
    };
}
export interface ChildBlocks {
    [blockName: string]: Block<object>;
}
export declare abstract class Block<TProps extends object> {
    private readonly domListeners;
    private parentElement;
    private readonly eventBus;
    props: TProps;
    childBlocks: ChildBlocks;
    slots: {
        [blockName: string]: HTMLElement;
    };
    constructor(parentElement: HTMLElement, props: TProps, children?: Children, tagName?: string);
    private registerEvents;
    init(): void;
    private _componentDidMount;
    componentDidMount(): void;
    private _componentDidUpdate;
    componentDidUpdate(oldProps: TProps, newProps: TProps): boolean;
    setProps(nextProps: object): void;
    reconnectBlockWithDom(block: Block<object>): void;
    reconnectChildrenSlotsWithDom(): void;
    removeFromDom(): void;
    togglePopup(isShow: boolean, cssSelector: string): void;
    forceRender(): void;
    private _render;
    checkAllBlocksTree(block: Block<Props>, nodesFromDom: NodeListOf<HTMLElement>): void;
    beforeRender(): void;
    abstract render(): string;
    afterRender(): void;
    getContent(): HTMLElement;
    private makePropsProxy;
    show(): void;
    private makeHtmlElementVisible;
    hide(): void;
    private makeHtmlElementHidden;
    removeListener(parent: HTMLElement, event: keyof HTMLElementEventMap, callback: (any: any) => any): void;
    removeAllListenersByEvent(el: HTMLElement, event: keyof HTMLElementEventMap): void;
    addListener(parent: HTMLElement, eventName: keyof HTMLElementEventMap, callback: (any: any) => any, cssSelector: string): this;
    detachListenersFromElement(parent: HTMLElement): void;
    attachListenersToElement(parent: HTMLElement): void;
}
