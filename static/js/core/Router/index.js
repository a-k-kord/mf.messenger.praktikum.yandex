var Route = (function () {
    function Route(pathname, view, props) {
        this.pathname = pathname;
        this.blockClass = view;
        this.block = null;
        this.props = props;
    }
    Route.prototype.navigate = function (pathname) {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    };
    Route.prototype.leave = function () {
        if (this.block) {
            this.block.hide();
        }
    };
    Route.prototype.match = function (pathname) {
        return pathname === this.pathname;
    };
    Route.prototype.render = function () {
        if (!this.block) {
            var rootQuery = this.props.rootQuery;
            var root = document.querySelector(rootQuery);
            this.block = new this.blockClass(root, {});
            this.block.show();
            return;
        }
        this.block.forceRender();
        this.block.show();
    };
    return Route;
}());
export { Route };
var Router = (function () {
    function Router(rootQuery) {
        if (Router.instance) {
            return Router.instance;
        }
        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
        this.rootQuery = rootQuery;
        Router.instance = this;
    }
    Router.getInstance = function (rootCssSelector) {
        if (rootCssSelector === void 0) { rootCssSelector = '#app'; }
        if (Router.instance) {
            return Router.instance;
        }
        return new Router(rootCssSelector);
    };
    Router.prototype.use = function (pathname, blockClass) {
        var route = new Route(pathname, blockClass, { rootQuery: this.rootQuery });
        this.routes.push(route);
        return this;
    };
    Router.prototype.start = function () {
        var _this = this;
        window.onpopstate = function (event) {
            _this.onRoute(document.location.pathname);
        };
        this.onRoute(document.location.pathname);
    };
    Router.prototype.onRoute = function (pathname) {
        var route = this.getRoute(pathname);
        if (!route) {
            route = this.getRoute('/error/404');
        }
        if (this.currentRoute) {
            this.currentRoute.leave();
        }
        this.currentRoute = route;
        route.render();
    };
    Router.prototype.go = function (pathname) {
        this.history.pushState({}, '', pathname);
        this.onRoute(pathname);
    };
    Router.prototype.back = function () {
        this.history.go(-1);
    };
    Router.prototype.forward = function () {
        this.history.go(1);
    };
    Router.prototype.getRoute = function (pathname) {
        return this.routes.find(function (route) { return route.match(pathname); });
    };
    return Router;
}());
export { Router };
