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
import { inputsToggleReadonly } from '../Link/index.js';
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(parentElement, props, children) {
        var _this = _super.call(this, parentElement, props, children) || this;
        if (props.type === 'submit') {
            var handler = function () { };
            switch (props.onclick) {
                case 'toggleReadonly':
                    handler = inputsToggleReadonly;
                    break;
                case 'submit':
                default: handler = validateForm;
            }
            _this.addListener(_this.getContent(), 'submit', handler.bind(_this), 'form');
        }
        return _this;
    }
    Button.prototype.render = function () {
        return compileTemplate(template, {
            props: __assign({}, this.props),
            slots: __assign({}, this.slots)
        });
    };
    return Button;
}(Block));
export { Button };
function validateForm(event) {
    event.preventDefault();
    var obj = {};
    var form = event.target.closest('form');
    var inputs = form.querySelectorAll('input');
    inputs.forEach(function (input) {
        var event = new Event('blur', {
            bubbles: true,
            cancelable: true,
        });
        input.dispatchEvent(event);
        obj[input.id] = input.value;
    });
    console.log(obj);
}
