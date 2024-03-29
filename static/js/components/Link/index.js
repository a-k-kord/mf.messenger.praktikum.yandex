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
import { Router } from '../../core/Router/index.js';
var Link = (function (_super) {
    __extends(Link, _super);
    function Link(parentElement, props, children) {
        var _this = _super.call(this, parentElement, props, children) || this;
        _this.addListener(_this.getContent(), 'click', handleClick.bind(_this), 'a');
        return _this;
    }
    Link.prototype.render = function () {
        return compileTemplate(template, {
            props: __assign({}, this.props),
            slots: __assign({}, this.slots),
        });
    };
    return Link;
}(Block));
export { Link };
function handleClick(evt) {
    evt.preventDefault();
    if (typeof this.props.handleMethod === 'function') {
        this.props.handleMethod();
    }
    else {
        var element = this.parentElement.querySelector('a');
        var pathnameArr = element.href.split('/');
        var pathname = pathnameArr[pathnameArr.length - 1];
        Router.getInstance().go("/" + pathname);
    }
}
