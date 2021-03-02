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
import { mockChatData } from '../../mockData/Chat.js';
import { Block } from '../../core/Block/index.js';
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
var Chat = (function (_super) {
    __extends(Chat, _super);
    function Chat(parentElement, props, children, tagName) {
        if (children === void 0) { children = defaultChildren; }
        return _super.call(this, parentElement, props, children, tagName) || this;
    }
    Chat.prototype.render = function () {
        return compileTemplate(template, {
            props: __assign(__assign({}, this.props), { mockData: mockChatData }),
            slots: __assign({}, this.slots)
        });
    };
    return Chat;
}(Block));
export { Chat };
var defaultChildren = {
    buttonAdd: {
        blockConstructor: Button,
        blockProps: {
            type: 'submit',
            formMethod: 'POST',
            hasText: true,
            text: 'Добавить',
            size: 'small',
            theme: 'light',
            weight: 'bold',
            wrapperStyles: 'form__button',
        }
    },
    buttonRemoveUser: {
        blockConstructor: Button,
        blockProps: {
            type: 'submit',
            formMethod: 'POST',
            hasText: true,
            text: 'Удалить',
            size: 'small',
            theme: 'light',
            weight: 'bold',
            wrapperStyles: 'form__button',
        }
    },
    buttonRemoveChat: {
        blockConstructor: Button,
        blockProps: {
            type: 'submit',
            formMethod: 'POST',
            hasText: true,
            text: 'Удалить',
            size: 'small',
            theme: 'light',
            weight: 'bold',
            wrapperStyles: 'form__button',
        }
    },
    buttonSend: {
        blockConstructor: Button,
        blockProps: {
            type: 'submit',
            formMethod: 'POST',
            hasText: false,
            stylesAfter: 'send icon-arrow-right',
            image: '<img src="img/arrow-back-btn.svg" alt="Send message" class="dropdown__icon">'
        }
    },
    login: {
        blockConstructor: Input,
        blockProps: {
            id: 'login',
            name: 'login',
            placeholder: 'Логин',
            hasText: true,
            size: 'small',
            stylesAfter: 'form__input box box--underlined-primary',
            wrapperStyles: 'form__item form__item--big',
            validationType: 'login',
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Логин',
                    size: 'tiny',
                    theme: 'label',
                    stylesAfter: 'form__label form__label--with-anim-up',
                    attrs: 'for="login"',
                }
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Неверный логин',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg',
                    isHidden: true,
                }
            }
        }
    },
};
