import { EventBus } from '../EventBus/index.js';
var EVENTS;
(function (EVENTS) {
    EVENTS["INIT"] = "init";
    EVENTS["FLOW_CDM"] = "flow:component-did-mount";
    EVENTS["FLOW_RENDER"] = "flow:render";
    EVENTS["FLOW_CDU"] = "flow:component-did-update";
})(EVENTS || (EVENTS = {}));
;
var Block = (function () {
    function Block(props) {
        var _this = this;
        this.setProps = function (nextProps) {
            if (!nextProps) {
                return;
            }
            Object.assign(_this.props, nextProps);
        };
        this.eventBus = new EventBus();
        this._element = null;
        this.props = this._makePropsProxy(props);
        this._registerEvents(this.eventBus);
        this.eventBus.emit(EVENTS.INIT);
    }
    Block.prototype._registerEvents = function (eventBus) {
        eventBus.on(EVENTS.INIT, this.init.bind(this));
        eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    };
    Block.prototype.init = function () {
        this.eventBus.emit(EVENTS.FLOW_CDM);
    };
    Block.prototype._componentDidMount = function () {
        this.componentDidMount();
        this.eventBus.emit(EVENTS.FLOW_RENDER);
    };
    Block.prototype.componentDidMount = function () { };
    Block.prototype._componentDidUpdate = function (oldProps, newProps) {
        var hasUpdate = false;
        for (var prop in newProps) {
            if (newProps[prop] !== oldProps[prop]) {
                hasUpdate = true;
                break;
            }
        }
        var response = this.componentDidUpdate(oldProps, newProps);
        if (response && hasUpdate) {
            this.eventBus.emit(EVENTS.FLOW_RENDER);
            return true;
        }
        return false;
    };
    Block.prototype.componentDidUpdate = function (oldProps, newProps) {
        return true;
    };
    Object.defineProperty(Block.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: false,
        configurable: true
    });
    Block.prototype._render = function () {
        this._element.innerHTML = this.render();
    };
    Block.prototype.getContent = function () {
        return this._element;
    };
    Block.prototype._makePropsProxy = function (props) {
        var self = this;
        var proxyProps = new Proxy(props, {
            set: function (target, prop, val) {
                var _a, _b;
                if (target[prop] === val) {
                    return false;
                }
                var oldPropVal = target[prop];
                target[prop] = val;
                self.eventBus.emit(EVENTS.FLOW_CDU, (_a = {}, _a[prop] = oldPropVal, _a), (_b = {}, _b[prop] = val, _b));
                return true;
            },
            deleteProperty: function () {
                throw new Error("Нет доступа");
            }
        });
        return proxyProps;
    };
    Block.prototype.show = function () {
        this.getContent().style.display = 'block';
    };
    Block.prototype.hide = function () {
        this.getContent().style.display = 'none';
    };
    return Block;
}());
export { Block };
