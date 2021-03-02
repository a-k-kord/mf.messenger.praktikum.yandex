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
import { createBlockDocumentElement, hide, isInDom, show } from '../../utils/dom.js';
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
        this._parentElement = parentElement;
        this.props = this._makePropsProxy(props);
        this.slots = {};
        this.childBlocks = {};
        this._domListeners = {};
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
    ;
    Block.prototype.reconnectBlockWithDom = function (block) {
        if (block._parentElement.dataset.blockId) {
            var parentFromDom = document.querySelector("[data-block-id=\"" + block._parentElement.dataset.blockId + "\"]");
            if (parentFromDom && !isInDom(block._parentElement)) {
                block.detachListenersFromElement(block._parentElement);
                block._parentElement = parentFromDom;
                block.attachListenersToElement(block._parentElement);
            }
        }
    };
    Block.prototype.reconnectChildrenSlotsWithDom = function () {
        var e_2, _a;
        try {
            for (var _b = __values(Object.entries(this.childBlocks)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), blockName = _d[0], blockObj = _d[1];
                this.reconnectBlockWithDom(blockObj);
                this.slots[blockName] = blockObj._parentElement;
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
        if (this._parentElement.dataset.blockId) {
            var parentFromDom = document.querySelector("[data-block-id=\"" + this._parentElement.dataset.blockId + "\"]");
            if (parentFromDom) {
                this.detachListenersFromElement(this._parentElement);
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
        this.detachListenersFromElement(this._parentElement);
        this._parentElement.innerHTML = this.render();
        this.attachListenersToElement(this._parentElement);
        this.reconnectChildrenSlotsWithDom();
        this.reconnectBlockWithDom(this);
        if (!this._parentElement.dataset.blockId) {
            var childBlocksFromDom = document.querySelectorAll("[data-block-id]");
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
            if (node.dataset.blockId === block._parentElement.dataset.blockId) {
                block.detachListenersFromElement(block._parentElement);
                block._parentElement = node;
                block.attachListenersToElement(block._parentElement);
            }
        });
    };
    Block.prototype.getContent = function () {
        return this._parentElement;
    };
    Block.prototype._makePropsProxy = function (props) {
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
                throw new Error("Нет доступа");
            }
        });
        return proxyProps;
    };
    Block.prototype.show = function () {
        this.setProps({ isHidden: false });
    };
    Block.prototype.makeHtmlElementVisible = function () {
        show(this._parentElement);
    };
    Block.prototype.hide = function () {
        this.setProps({ isHidden: true });
    };
    Block.prototype.makeHtmlElementHidden = function () {
        hide(this._parentElement);
    };
    Block.prototype.removeListener = function (parent, event, callback) {
        this._domListeners[event] = this._domListeners[event].filter(function (listener) {
            if (listener !== callback) {
                parent.removeEventListener(event, callback);
                return true;
            }
            return false;
        });
    };
    Block.prototype.addListener = function (parent, event, callback, cssSelector) {
        var fn = function (eventName) {
            if (eventName.target.matches(cssSelector)
                || (cssSelector === 'a' && eventName.target.parentElement.matches(cssSelector))
                || (cssSelector === 'a' && eventName.target.parentElement.parentElement.matches(cssSelector))) {
                callback(eventName);
            }
        };
        parent.addEventListener(event, fn);
        if (!this._domListeners[event]) {
            this._domListeners[event] = [];
        }
        this._domListeners[event].push(fn);
        return this;
    };
    Block.prototype.detachListenersFromElement = function (parent) {
        var _this = this;
        var el = parent.querySelector('input,button,a');
        Object.keys(this._domListeners).map(function (event) {
            _this._domListeners[event].map(function (callback) {
                el.removeEventListener(event, callback);
            });
        });
    };
    Block.prototype.attachListenersToElement = function (parent) {
        var _this = this;
        var el = parent.querySelector('input,button,a');
        Object.keys(this._domListeners).map(function (event) {
            _this._domListeners[event].map(function (callback) {
                el.addEventListener(event, callback);
            });
        });
    };
    return Block;
}());
export { Block };
