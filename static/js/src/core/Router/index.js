var Route = (function () {
    function Route(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }
    Route.prototype.navigate = function (pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    };
    Route.prototype.leave = function () {
        if (this._block) {
            this._block.hide();
        }
    };
    Route.prototype.match = function (pathname) {
        return pathname === this._pathname;
    };
    Route.prototype.render = function () {
        if (!this._block) {
            var rootQuery = this._props.rootQuery;
            var root = document.querySelector(rootQuery);
            this._block = new this._blockClass(root, {});
            return;
        }
        this._block.show();
    };
    return Route;
}());
export { Route };
var Router = (function () {
    function Router(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }
    Router.prototype.use = function (pathname, blockClass) {
        var route = new Route(pathname, blockClass, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    };
    Router.prototype.start = function () {
        var _this = this;
        window.onpopstate = function (event) {
            _this._onRoute(document.location.pathname);
        };
        this._onRoute('/');
    };
    Router.prototype._onRoute = function (pathname) {
        var route = this.getRoute(pathname);
        if (!route) {
            return;
        }
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    };
    Router.prototype.go = function (pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    };
    Router.prototype.back = function () {
        this.history.back();
    };
    Router.prototype.forward = function () {
        this.history.forward();
    };
    Router.prototype.getRoute = function (pathname) {
        return this.routes.find(function (route) { return route.match(pathname); });
    };
    return Router;
}());
export { Router };
