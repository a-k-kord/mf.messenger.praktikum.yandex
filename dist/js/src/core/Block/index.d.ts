import { EventBus } from "../EventBus/index.js";
export declare abstract class Block<TProps extends object> {
    private _element;
    protected readonly eventBus: EventBus;
    props: TProps;
    constructor(props: TProps);
    private _registerEvents;
    init(): void;
    private _componentDidMount;
    componentDidMount(): void;
    private _componentDidUpdate;
    componentDidUpdate(oldProps: TProps, newProps: TProps): boolean;
    setProps: (nextProps: TProps) => void;
    get element(): HTMLElement;
    _render(): void;
    abstract render(): string;
    getContent(): HTMLElement | null;
    _makePropsProxy(props: TProps): TProps;
    show(): void;
    hide(): void;
}
