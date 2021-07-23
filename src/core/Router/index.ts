// eslint-disable-next-line max-classes-per-file
import { Block, BlockClass } from '../Block/index';
import { PlainObject } from '../../utils/utils';

export class Route {
    private pathname: string;

    private blockClass: BlockClass;

    private block: Block<object>;

    private props: PlainObject;

    constructor(pathname: string, view: BlockClass, props: PlainObject) {
        this.pathname = pathname;
        this.blockClass = view;
        this.block = null;
        this.props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this.block) {
            this.block.hide();
        }
    }

    match(pathname) {
        return pathname === this.pathname;
    }

    render() {
        if (!this.block) {
            const { rootQuery } = this.props;
            const root: HTMLElement = document.querySelector(rootQuery as string);
            // eslint-disable-next-line new-cap
            this.block = new this.blockClass(root, {});
            this.block.show();
            return;
        }
        this.block.forceRender();
        this.block.show();
    }
}

export class Router {
    static instance;

    static getInstance(rootCssSelector: string = '#app') {
        if (Router.instance) {
            return Router.instance;
        }
            return new Router(rootCssSelector);
    }

    public history: History;

    private routes: Route [];

    private currentRoute: null | Route;

    private rootQuery: string;

    constructor(rootQuery: string) {
        if (Router.instance) {
            return Router.instance;
        }

        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
        this.rootQuery = rootQuery;

        Router.instance = this;
    }

    use(pathname: string, blockClass: BlockClass) {
        const route = new Route(pathname, blockClass, { rootQuery: this.rootQuery });
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event) => {
            this.onRoute(document.location.pathname);
        };
        this.onRoute(document.location.pathname);
    }

    private onRoute(pathname: string) {
        let route = this.getRoute(pathname);
        if (!route) {
            route = this.getRoute('/error/404');
        }

        if (this.currentRoute) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this.onRoute(pathname);
    }

    back() {
        this.history.go(-1);
    }

    forward() {
        this.history.go(1);
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}
