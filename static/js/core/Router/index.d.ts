import { BlockClass } from '../Block/index';
import { PlainObject } from '../../utils/utils';
export declare class Route {
    private _pathname;
    private _blockClass;
    private _block;
    private _props;
    constructor(pathname: string, view: BlockClass, props: PlainObject);
    navigate(pathname: string): void;
    leave(): void;
    match(pathname: any): boolean;
    render(): void;
}
export declare class Router {
    static __instance: any;
    static getInstance(rootCssSelector?: string): any;
    history: History;
    private routes;
    private _currentRoute;
    private _rootQuery;
    constructor(rootQuery: string);
    use(pathname: string, blockClass: BlockClass): this;
    start(): void;
    private _onRoute;
    go(pathname: string): void;
    back(): void;
    forward(): void;
    getRoute(pathname: string): Route;
}
