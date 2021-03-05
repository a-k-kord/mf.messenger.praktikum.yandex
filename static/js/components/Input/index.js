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
import { Block } from '../../core/Block/index.js';
import { validateEmail, validatePasswordConfirm, validatePhone, validateLimitedString } from '../../utils/validation.js';
export var ValidationMethods = {
    limitedString: validateLimitedString,
    email: validateEmail,
    passwordConfirm: validatePasswordConfirm,
    phone: validatePhone
};
var Input = (function (_super) {
    __extends(Input, _super);
    function Input(parentElement, props, children) {
        var _this = _super.call(this, parentElement, props, children) || this;
        if (props.validationType) {
            _this.addListener(_this.getContent(), 'blur', ValidationMethods[props.validationType].bind(_this), 'input');
            _this.addListener(_this.getContent(), 'focus', ValidationMethods[props.validationType].bind(_this), 'input');
        }
        if (props.type === 'file') {
            _this.addListener(_this.getContent(), 'change', setUploadedFileName.bind(_this), 'input[type="file"]');
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
function setUploadedFileName(event) {
    var input = event.target;
    var filename = input.value.split('\\').pop();
    var labelEl = document.querySelector('.uploaded__file-name');
    var errorEl = document.querySelector('.uploaded__error');
    if (filename) {
        labelEl.textContent = filename;
        labelEl.hidden = false;
        input.parentElement.style.display = 'none';
        errorEl.hidden = true;
    }
    else {
        labelEl.hidden = true;
        errorEl.hidden = false;
        input.parentElement.style.display = 'block';
    }
}
