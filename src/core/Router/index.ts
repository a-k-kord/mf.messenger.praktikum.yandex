import { Block, BlockClass } from '../Block/index';
import { PlainObject } from '../../utils/utils';

export class Route {
    private _pathname: string;
    private _blockClass: BlockClass;
    private _block: Block<object>;
    private _props: PlainObject;

    constructor(pathname: string, view: BlockClass, props: PlainObject) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            const { rootQuery } = this._props;
            const root: HTMLElement = document.querySelector(rootQuery as string);
            this._block = new this._blockClass(root, {});
            this._block.show();
            return;
        }
        this._block.forceRender();
        this._block.show();
    }
}

export class Router {
    static __instance;
    static getInstance(rootCssSelector: string = '#app') {
        if (Router.__instance) {
            return Router.__instance;
        } else {
            return new Router(rootCssSelector);
        }
    }

    public history: History;
    private routes: Route [];
    private _currentRoute: null | Route;
    private _rootQuery: string;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, blockClass: BlockClass) {
        const route = new Route(pathname, blockClass, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = event => {
            this._onRoute(document.location.pathname);
        }
        this._onRoute(document.location.pathname);
    }

    private _onRoute(pathname: string) {
        let route = this.getRoute(pathname);
        if(!route) {
            route = this.getRoute('/error/404');
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.go(-1);
    }

    forward() {
        this.history.go(1);
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}