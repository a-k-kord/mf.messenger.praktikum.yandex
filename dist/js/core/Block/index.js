import { EventBus } from "../EventBus/index.js";
import { createBlockDocumentElement, hide, isInDom, show } from '../../utils/dom.js';
var EVENTS;
(function (EVENTS) {
    EVENTS["INIT"] = "init";
    EVENTS["FLOW_CDM"] = "flow:component-did-mount";
    EVENTS["FLOW_RENDER"] = "flow:render";
    EVENTS["FLOW_CDU"] = "flow:component-did-update";
})(EVENTS || (EVENTS = {}));
var Block = (function () {
    function Block(parentElement, props, children) {
        var _this = this;
        this.setProps = function (nextProps) {
            if (!nextProps) {
                return;
            }
            Object.assign(_this.props, nextProps);
        };
        this.eventBus = new EventBus();
        this._parentElement = parentElement;
        this.props = this._makePropsProxy(props);
        this.slots = {};
        this.childBlocks = {};
        this._domListeners = {};
        if (children) {
            Object.keys(children).forEach(function (blockName) {
                var _a = children[blockName], blockConstructor = _a.blockConstructor, blockProps = _a.blockProps, subChildren = _a.children;
                _this.slots[blockName] = createBlockDocumentElement(blockName);
                _this.childBlocks[blockName] = new blockConstructor(_this.slots[blockName], blockProps, subChildren);
            });
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
    Block.prototype.reconnectWithDom = function () {
        if (this._parentElement.dataset.blockId) {
            var parentFromDom = document.querySelector("[data-block-id=\"" + this._parentElement.dataset.blockId + "\"]");
            if (parentFromDom && !isInDom(this._parentElement)) {
                this.detachListenersFromElement(this._parentElement);
                this._parentElement = parentFromDom;
                this.attachListenersToElement(this._parentElement);
            }
        }
    };
    Block.prototype._render = function () {
        this.reconnectWithDom();
        this._parentElement.innerHTML = this.render();
        this.reconnectWithDom();
        if (!this._parentElement.dataset.blockId) {
            var childBlocksFromDom = document.querySelectorAll("[data-block-id]");
            this.checkAllBlocksTree(this, childBlocksFromDom);
        }
        if (this.props.isHidden) {
            this.hide();
        }
        else {
            this.show();
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
        show(this._parentElement);
    };
    Block.prototype.hide = function () {
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
            if (!eventName.target.matches(cssSelector)) {
                return;
            }
            callback(eventName);
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
        Object.keys(this._domListeners).map(function (event) {
            _this._domListeners[event].map(function (callback) {
                parent.removeEventListener(event, callback);
            });
        });
    };
    Block.prototype.attachListenersToElement = function (parent) {
        var _this = this;
        var input = parent.querySelector('input');
        Object.keys(this._domListeners).map(function (event) {
            _this._domListeners[event].map(function (callback) {
                input.addEventListener(event, callback);
            });
        });
    };
    return Block;
}());
export { Block };
