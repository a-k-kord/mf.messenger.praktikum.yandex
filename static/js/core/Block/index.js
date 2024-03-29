var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { EventBus } from '../EventBus/index.js';
import { createBlockDocumentElement, hide, isInDom, preventEvent, show, } from '../../utils/dom.js';
var EVENTS;
(function (EVENTS) {
    EVENTS["INIT"] = "init";
    EVENTS["FLOW_CDM"] = "flow:component-did-mount";
    EVENTS["FLOW_RENDER"] = "flow:render";
    EVENTS["FLOW_CDU"] = "flow:component-did-update";
})(EVENTS || (EVENTS = {}));
var Block = (function () {
    function Block(parentElement, props, children, tagName) {
        var e_1, _a;
        this.eventBus = new EventBus();
        this.parentElement = parentElement;
        this.props = this.makePropsProxy(props);
        this.slots = {};
        this.childBlocks = {};
        this.domListeners = {};
        if (children) {
            try {
                for (var _b = __values(Object.entries(children)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), blockName = _d[0], _e = _d[1], blockConstructor = _e.blockConstructor, blockProps = _e.blockProps, subChildren = _e.children;
                    this.slots[blockName] = createBlockDocumentElement(blockName, tagName);
                    this.childBlocks[blockName] = new blockConstructor(this.slots[blockName], blockProps, subChildren);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        this.registerEvents(this.eventBus);
        this.eventBus.emit(EVENTS.INIT);
    }
    Block.prototype.registerEvents = function (eventBus) {
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
    Block.prototype.componentDidMount = function () {
    };
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
    Block.prototype.setProps = function (nextProps) {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };
    Block.prototype.reconnectBlockWithDom = function (block) {
        var parentBlockId = block.parentElement.getAttribute('data-block-id');
        if (parentBlockId) {
            var parentFromDom = document.querySelector("[data-block-id=\"" + parentBlockId + "\"]");
            if (parentFromDom && !isInDom(block.parentElement)) {
                block.detachListenersFromElement(block.parentElement);
                block.parentElement = parentFromDom;
                block.attachListenersToElement(block.parentElement);
            }
        }
    };
    Block.prototype.reconnectChildrenSlotsWithDom = function () {
        var e_2, _a;
        try {
            for (var _b = __values(Object.entries(this.childBlocks)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), blockName = _d[0], blockObj = _d[1];
                this.reconnectBlockWithDom(blockObj);
                this.slots[blockName] = blockObj.parentElement;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    Block.prototype.removeFromDom = function () {
        var parentBlockId = this.parentElement.getAttribute('data-block-id');
        if (parentBlockId) {
            var parentFromDom = document.querySelector("[data-block-id=\"" + parentBlockId + "\"]");
            if (parentFromDom) {
                this.detachListenersFromElement(this.parentElement);
                parentFromDom.parentElement.removeChild(parentFromDom);
            }
        }
    };
    Block.prototype.togglePopup = function (isShow, cssSelector) {
        var popupEl = document.querySelector(cssSelector);
        popupEl.style.display = isShow ? 'block' : 'none';
    };
    Block.prototype.forceRender = function () {
        this.eventBus.emit(EVENTS.FLOW_RENDER);
    };
    Block.prototype._render = function () {
        this.reconnectBlockWithDom(this);
        this.reconnectChildrenSlotsWithDom();
        this.detachListenersFromElement(this.parentElement);
        this.beforeRender();
        this.parentElement.innerHTML = this.render();
        this.afterRender();
        this.attachListenersToElement(this.parentElement);
        this.reconnectChildrenSlotsWithDom();
        this.reconnectBlockWithDom(this);
        var parentBlockId = this.parentElement.getAttribute('data-block-id');
        if (!parentBlockId) {
            var childBlocksFromDom = document.querySelectorAll('[data-block-id]');
            this.checkAllBlocksTree(this, childBlocksFromDom);
        }
        if (this.props.isHidden === true) {
            this.makeHtmlElementHidden();
        }
        else if (this.props.isHidden === false) {
            this.makeHtmlElementVisible();
        }
    };
    Block.prototype.checkAllBlocksTree = function (block, nodesFromDom) {
        var _this = this;
        if (Object.keys(block.childBlocks).length) {
            Object.keys(block.childBlocks).map(function (blockName) {
                _this.checkAllBlocksTree(block.childBlocks[blockName], nodesFromDom);
            });
        }
        nodesFromDom.forEach(function (node) {
            var nodeBlockId = node.getAttribute('data-block-id');
            var parentBlockId = block.parentElement.getAttribute('data-block-id');
            if (nodeBlockId === parentBlockId) {
                block.detachListenersFromElement(block.parentElement);
                block.parentElement = node;
                block.attachListenersToElement(block.parentElement);
            }
        });
    };
    Block.prototype.beforeRender = function () {
    };
    Block.prototype.afterRender = function () {
    };
    Block.prototype.getContent = function () {
        return this.parentElement;
    };
    Block.prototype.makePropsProxy = function (props) {
        var self = this;
        var proxyProps = new Proxy(props, {
            set: function (target, prop, val) {
                var _a, _b;
                if (target[prop] !== val) {
                    var oldPropVal = target[prop];
                    target[prop] = val;
                    self.eventBus.emit(EVENTS.FLOW_CDU, (_a = {}, _a[prop] = oldPropVal, _a), (_b = {}, _b[prop] = val, _b));
                }
                return true;
            },
            deleteProperty: function () {
                throw new Error('Нет доступа');
            },
        });
        return proxyProps;
    };
    Block.prototype.show = function () {
        this.setProps({ isHidden: false });
    };
    Block.prototype.makeHtmlElementVisible = function () {
        show(this.parentElement);
    };
    Block.prototype.hide = function () {
        this.setProps({ isHidden: true });
    };
    Block.prototype.makeHtmlElementHidden = function () {
        hide(this.parentElement);
    };
    Block.prototype.removeListener = function (parent, event, callback) {
        this.domListeners[event] = this.domListeners[event].filter(function (listener) {
            if (listener !== callback) {
                parent.removeEventListener(event, callback);
                return true;
            }
            return false;
        });
    };
    Block.prototype.removeAllListenersByEvent = function (el, event) {
        this.domListeners[event].map(function (listener) { return el.removeEventListener(event, listener); });
        this.domListeners[event] = [];
    };
    Block.prototype.addListener = function (parent, eventName, callback, cssSelector) {
        var fn = function (event) {
            if (event.currentTarget.matches(cssSelector)
                || (cssSelector === 'a' && event.currentTarget.parentElement.matches(cssSelector))
                || (cssSelector === 'a' && event.currentTarget.parentElement.parentElement.matches(cssSelector))) {
                preventEvent(event);
                callback(event);
            }
        };
        parent.addEventListener(eventName, fn);
        if (!this.domListeners[eventName]) {
            this.domListeners[eventName] = [];
        }
        this.domListeners[eventName].push(fn);
        return this;
    };
    Block.prototype.detachListenersFromElement = function (parent) {
        var _this = this;
        if (parent.className === 'block-wrapper') {
            var el_1 = parent.querySelector('input,button,a');
            Object.keys(this.domListeners)
                .map(function (event) {
                _this.domListeners[event].map(function (callback) {
                    el_1.removeEventListener(event, callback);
                });
            });
        }
    };
    Block.prototype.attachListenersToElement = function (parent) {
        var _this = this;
        if (parent.className === 'block-wrapper') {
            var el_2 = parent.querySelector('input,button,a');
            Object.keys(this.domListeners)
                .map(function (event) {
                _this.domListeners[event].map(function (callback) {
                    el_2.addEventListener(event, callback);
                });
            });
        }
    };
    return Block;
}());
export { Block };
