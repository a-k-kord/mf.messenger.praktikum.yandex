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
import { preventEvent } from '../../utils/dom.js';
var Link = (function (_super) {
    __extends(Link, _super);
    function Link(parentElement, props, children) {
        var _this = _super.call(this, parentElement, props, children) || this;
        if (props.onclick) {
            var handler = function () { };
            switch (props.onclick) {
                case 'toggleReadonly':
                    handler = inputsToggleReadonly.bind(_this);
                    break;
            }
            _this.addListener(_this.getContent(), 'click', handler, 'a');
        }
        return _this;
    }
    Link.prototype.render = function () {
        return compileTemplate(template, {
            props: __assign({}, this.props),
            slots: __assign({}, this.slots)
        });
    };
    return Link;
}(Block));
export { Link };
export function inputsToggleReadonly(event) {
    preventEvent(event);
    var form = event.target.closest('form');
    var inputs = form.querySelectorAll('input');
    inputs.forEach(function (input) {
        input.toggleAttribute('readonly');
    });
}
