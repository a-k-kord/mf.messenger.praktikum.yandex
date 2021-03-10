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
import { compileTemplate } from '../../core/Template/index';
import template from './template';
import { Block } from '../../core/Block/index';
import { Title } from '../../components/Title/index';
import { Link } from '../../components/Link/index';
var errors = {
    '404': {
        errNum: 404,
        errMessage: 'Не туда попали'
    },
    '500': {
        errNum: 500,
        errMessage: 'Мы уже фиксим'
    },
};
var Error = (function (_super) {
    __extends(Error, _super);
    function Error(parentElement, props, children, tagName) {
        var _this = this;
        var _a = errors[404], errNum = _a.errNum, errMessage = _a.errMessage;
        var pathMatch = document.location.pathname.match(/\/error\/(\d+)$/);
        if (pathMatch) {
            errNum = parseInt(pathMatch[1]);
            errMessage = errors[errNum];
        }
        children = children || {
            errNum: {
                blockConstructor: Title,
                blockProps: {
                    stylesBefore: 'error__number',
                    text: errNum,
                    size: 'big',
                }
            },
            errMessage: {
                blockConstructor: Title,
                blockProps: {
                    stylesBefore: 'error__msg',
                    text: errMessage,
                }
            },
            linkBack: {
                blockConstructor: Link,
                blockProps: {
                    type: 'routeLink',
                    linkTo: 'chat',
                    text: 'Назад к чатам',
                    size: 'small',
                    theme: 'primary'
                }
            }
        };
        _this = _super.call(this, parentElement, props, children, tagName) || this;
        return _this;
    }
    Error.prototype.render = function () {
        return compileTemplate(template, {
            props: __assign({}, this.props),
            slots: __assign({}, this.slots)
        });
    };
    return Error;
}(Block));
export { Error };
