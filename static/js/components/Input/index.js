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
function validateLogin(event) {
    var input = event.target;
    if (input.value.length > 10) {
        this.childBlocks.error.setProps({ text: 'Слишком длинный логин', isHidden: false });
    }
    else {
        this.childBlocks.error.setProps({ text: '', isHidden: true });
    }
}
function validateEmail(event) {
    var input = event.target;
    if (!new RegExp('/^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/').test(input.value)) {
        this.childBlocks.error.setProps({ text: 'Не валидный формат почты', isHidden: false });
    }
    else {
        this.childBlocks.error.setProps({ text: '', isHidden: true });
    }
}
var ValidationMethods = {
    login: validateLogin,
    email: validateEmail,
};
var Input = (function (_super) {
    __extends(Input, _super);
    function Input(parentElement, props, children) {
        var _this = _super.call(this, parentElement, props, children) || this;
        if (props.validationType) {
            _this.addListener(_this.getContent(), 'blur', ValidationMethods[props.validationType].bind(_this), 'input');
            _this.addListener(_this.getContent(), 'focus', ValidationMethods[props.validationType].bind(_this), 'input');
        }
        return _this;
    }
    Input.prototype.render = function () {
        return compileTemplate(template, {
            props: __assign({}, this.props),
            slots: __assign({}, this.slots)
        });
    };
    return Input;
}(Block));
export { Input };
