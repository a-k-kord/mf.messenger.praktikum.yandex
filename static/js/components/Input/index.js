var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from "../../core/Block/index.js";
import { removeHTMLElement } from "../../utils/dom.js";
function validateLogin(parent, event) {
    var input = parent.querySelector('input');
    if (input.value.length > 20) {
        this.childBlocks.error.setProps({ text: 'Слишком длинный логин', isHidden: false });
    }
}
function validateEmail(parent, event) {
    var input = parent.querySelector('input');
    if (!new RegExp('/^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/').test(input.value)) {
        this.childBlocks.error.setProps({ text: 'Не валидный формат почты', isHidden: false });
    }
}
var Input = (function (_super) {
    __extends(Input, _super);
    function Input() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._eventsList = [];
        return _this;
    }
    Input.prototype.render = function () {
        this.addEvent(this.getContent(), 'blur', validateLogin.bind(this));
        return compileTemplate(template, {
            props: __assign({}, this.props),
            slots: __assign({}, this.slots)
        });
    };
    Input.prototype.addEvent = function (el, eventName, callback) {
        var cb = el.addEventListener(eventName, callback);
        this._eventsList.push({ el: el, name: eventName, callback: cb });
    };
    Input.prototype.removeEvent = function (target) {
        this._eventsList
            .filter(function (_a) {
            var el = _a.el;
            return el === target;
        })
            .forEach(function (_a) {
            var el = _a.el, eventName = _a.eventName, callback = _a.callback;
            el.removeEventListener(eventName, callback);
        });
    };
    Input.prototype.removeElement = function (target) {
        this.removeEvent(target);
        removeHTMLElement(target);
    };
    Input.prototype.destroyBlock = function () {
        this._eventsList.forEach(function (_a) {
            var el = _a.el, eventName = _a.eventName, callback = _a.callback;
            el.removeEventListener(eventName, callback);
        });
    };
    return Input;
}(Block));
export { Input };
