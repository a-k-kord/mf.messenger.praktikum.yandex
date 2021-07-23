var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(parentElement, props, children) {
        var _this = _super.call(this, parentElement, props, children) || this;
        _this.addListener(_this.getContent(), 'click', handleSubmit.bind(_this), "button[type=\"" + props.type + "\"]");
        return _this;
    }
    Button.prototype.render = function () {
        return compileTemplate(template, {
            props: __assign({}, this.props),
            slots: __assign({}, this.slots),
        });
    };
    return Button;
}(Block));
export { Button };
function handleSubmit(event) {
    event.preventDefault();
    var data = validateForm(event);
    if (data.isValid && typeof this.props.handleMethod === 'function') {
        this.props.handleMethod(data);
    }
}
function validateForm(event) {
    var isValid = true;
    var obj = {};
    var form = event.target.closest('form');
    var inputs = Array.from(form.querySelectorAll('[data-block-name]:not([style*="none"]) *')).filter(function (item) { return item.tagName === 'INPUT'; });
    var errorInputs = [];
    inputs.forEach(function (input) {
        var inputWrapper = input.closest('.block-wrapper');
        if (!inputWrapper.style.display || inputWrapper.style.display !== 'none') {
            var customEvent = new Event('blur', {
                bubbles: true,
                cancelable: true,
            });
            input.dispatchEvent(customEvent);
            obj[input.name] = input.value;
            var errorBlock = inputWrapper.querySelector('[data-block-name="error"]');
            if (errorBlock && errorBlock.style.display !== 'none') {
                isValid = false;
                errorInputs.push(input);
            }
        }
    });
    return {
        data: obj,
        form: form,
        errorInputs: errorInputs,
        isValid: isValid,
    };
}
