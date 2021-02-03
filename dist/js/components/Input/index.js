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
function validateLogin(event) {
    var input = event.target;
    if (!input.value.length) {
        this.childBlocks.error.setProps({ text: 'Необходимо заполнить', isHidden: false });
    }
    else {
        if (input.value.length < 15) {
            this.childBlocks.error.setProps({ text: '', isHidden: true });
        }
        else {
            this.childBlocks.error.setProps({ text: 'Слишком длинный логин', isHidden: false });
        }
    }
}
function validateEmail(event) {
    var input = event.target;
    if (!input.value.length) {
        this.childBlocks.error.setProps({ text: 'Необходимо заполнить', isHidden: false });
    }
    else {
        if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(input.value)) {
            this.childBlocks.error.setProps({ text: '', isHidden: true });
        }
        else {
            this.childBlocks.error.setProps({ text: 'Не валидный формат почты', isHidden: false });
        }
    }
}
