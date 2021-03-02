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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { mockChatData } from '../../mockData/Chat.js';
import { Block } from '../../core/Block/index.js';
import { Button } from "../../components/Button/index.js";
import { Input } from "../../components/Input/index.js";
import { Title } from "../../components/Title/index.js";
import { Link } from "../../components/Link/index.js";
import { addChatApi, addUsersToChatApi, getChatsApi, getChatUsersApi, getNewMessagesCount, getUserApi, handleError, removeChatApi, removeUsersFromChatApi } from "../../utils/api.js";
var Chat = (function (_super) {
    __extends(Chat, _super);
    function Chat(parentElement, props, children, tagName) {
        if (children === void 0) { children = defaultChildren; }
        var _this = _super.call(this, parentElement, props, children, tagName) || this;
        var addChatSelector = '#add-chat-popup';
        children.linkShowAddChatPopup.blockProps.handleMethod = _this.togglePopup.bind(_this, true, addChatSelector);
        children.linkCloseAddChatPopup.blockProps.handleMethod = _this.togglePopup.bind(_this, false, addChatSelector);
        children.buttonAddChat.blockProps.handleMethod = _this.makeApiCall.bind(_this, _this.childBlocks.buttonAddChat, {
            popupSelector: addChatSelector,
            apiMethod: addChatApi,
            beforeApiMethodCall: function () {
                _this.childBlocks.buttonAddChat.setProps({ isDisabled: true });
            },
            afterApiMethodCall: function () {
                _this.childBlocks.buttonAddChat.setProps({ isDisabled: false });
            },
            callbackWithResponse: function (responseData) {
                _this.togglePopup(false, addChatSelector);
                _this.getChatsFromServer();
            }
        });
        var removeChatSelector = '#remove-chat-popup';
        children.linkShowRemoveChatPopup.blockProps.handleMethod = _this.togglePopup.bind(_this, true, removeChatSelector);
        children.linkCloseRemoveChatPopup.blockProps.handleMethod = _this.togglePopup.bind(_this, false, removeChatSelector);
        children.buttonRemoveChat.blockProps.handleMethod = _this.makeApiCall.bind(_this, _this.childBlocks.buttonRemoveChat, {
            popupSelector: removeChatSelector,
            apiMethod: removeChatApi,
            beforeApiMethodCall: function () {
                _this.childBlocks.buttonRemoveChat.setProps({ isDisabled: true });
            },
            afterApiMethodCall: function () {
                _this.childBlocks.buttonRemoveChat.setProps({ isDisabled: false });
            },
            callbackWithResponse: function (responseData) {
                _this.togglePopup(false, removeChatSelector);
            }
        });
        var addUserSelector = '#add-user-popup';
        children.linkShowAddUserPopup.blockProps.handleMethod = _this.togglePopup.bind(_this, true, addUserSelector);
        children.linkCloseAddUserPopup.blockProps.handleMethod = _this.togglePopup.bind(_this, false, addUserSelector);
        children.buttonAddUser.blockProps.handleMethod = _this.makeApiCall.bind(_this, _this.childBlocks.buttonAddUser, {
            popupSelector: addUserSelector,
            apiMethod: addUsersToChatApi,
            beforeApiMethodCall: function () {
                _this.childBlocks.buttonAddUser.setProps({ isDisabled: true });
            },
            afterApiMethodCall: function () {
                _this.childBlocks.buttonAddUser.setProps({ isDisabled: false });
            },
            callbackWithResponse: function (responseData) {
                if (!responseData.errorMsg) {
                    _this.togglePopup(false, addUserSelector);
                    _this.childBlocks.chatUsersCountLabel.forceRender();
                    var usersCount = _this.childBlocks.chatUsersCountLabel.props.text;
                    _this.childBlocks.chatUsersCountLabel.setProps({ text: parseInt(usersCount) + 1 });
                }
                else {
                    console.log(responseData.errorMsg);
                }
            }
        });
        var removeUserSelector = '#remove-user-popup';
        children.linkShowRemoveUserPopup.blockProps.handleMethod = _this.togglePopup.bind(_this, true, removeUserSelector);
        children.linkCloseRemoveUserPopup.blockProps.handleMethod = _this.togglePopup.bind(_this, false, removeUserSelector);
        children.buttonRemoveUser.blockProps.handleMethod = _this.makeApiCall.bind(_this, _this.childBlocks.buttonRemoveUser, {
            popupSelector: removeUserSelector,
            apiMethod: removeUsersFromChatApi,
            beforeApiMethodCall: function () {
                _this.childBlocks.buttonRemoveUser.setProps({ isDisabled: true });
            },
            afterApiMethodCall: function () {
                _this.childBlocks.buttonRemoveUser.setProps({ isDisabled: false });
            },
            callbackWithResponse: function (responseData) {
                if (!responseData.errorMsg) {
                    _this.togglePopup(false, removeUserSelector);
                    var usersCount = _this.childBlocks.chatUsersCountLabel.props.text;
                    _this.childBlocks.chatUsersCountLabel.setProps({ text: parseInt(usersCount) - 1 });
                }
                else {
                    console.log(responseData.errorMsg);
                }
            }
        });
        getUserApi().then(function (data) {
            if (!data.errorMsg) {
                _this.getChatsFromServer();
            }
        });
        return _this;
    }
    Chat.prototype.makeApiCall = function (buttonBlock, apiCallData, formInputs) {
        var data = formInputs.data;
        var apiMethod = apiCallData.apiMethod, beforeApiMethodCall = apiCallData.beforeApiMethodCall, afterApiMethodCall = apiCallData.afterApiMethodCall, callbackWithResponse = apiCallData.callbackWithResponse;
        beforeApiMethodCall();
        apiMethod.call(this, { formInputs: data, chatId: this.props.selectedChatItemId }).then(function (response) {
            afterApiMethodCall();
            if (!data.errorMsg) {
                callbackWithResponse(response);
            }
            else {
                throw new Error(response.errorMsg);
            }
        }).catch(function (err) {
            afterApiMethodCall();
            handleError(err);
        });
    };
    Chat.prototype.getChatsFromServer = function () {
        var _this = this;
        getChatsApi().then(function (chatItems) {
            var e_1, _a;
            var _b;
            if ((_b = chatItems) === null || _b === void 0 ? void 0 : _b.length) {
                var chats = {};
                var _loop_1 = function (id, title) {
                    getNewMessagesCount({ chatId: parseInt(id) }).then(function (data) {
                        var _a, _b;
                        var unreadCount = ((_a = data) === null || _a === void 0 ? void 0 : _a.unread_count) || 0;
                        if (unreadCount && ((_b = _this.props) === null || _b === void 0 ? void 0 : _b.chats[id])) {
                            Object.assign(_this.props.chats[id], { unreadCount: unreadCount });
                            _this.setProps({ chats: _this.props.chats });
                        }
                    });
                    chats[id] = { title: title };
                };
                try {
                    for (var _c = __values(chatItems), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var _e = _d.value, id = _e.id, title = _e.title;
                        _loop_1(id, title);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                _this.setProps({ chats: chats });
            }
        });
    };
    Chat.prototype.addChatItemHandlers = function () {
        var _this = this;
        var chatItemLinks = this.getContent().querySelectorAll('.chat-item > a');
        chatItemLinks.forEach(function (item) {
            _this.addListener(item, 'click', handleSelectChatItem.bind(_this), 'a');
        });
    };
    Chat.prototype.setProps = function (nextProps) {
        _super.prototype.setProps.call(this, nextProps);
        this.addChatItemHandlers();
    };
    Chat.prototype.show = function () {
        var _this = this;
        getUserApi().then(function (data) {
            console.log(data);
            _this.getChatsFromServer();
            _super.prototype.show.call(_this);
        });
    };
    Chat.prototype.render = function () {
        return compileTemplate(template, {
            props: __assign(__assign({}, this.props), { mockData: mockChatData }),
            slots: __assign({}, this.slots)
        });
    };
    return Chat;
}(Block));
export { Chat };
function handleSelectChatItem(evt) {
    var _this = this;
    var chatId = evt.currentTarget.dataset.chatItemId;
    this.setProps({ selectedChatItemId: chatId });
    getChatUsersApi({ chatId: chatId }).then(function (data) {
        if (!data.errorMsg) {
            if (Array.isArray(data)) {
                _this.childBlocks.chatUsersCountLabel.setProps({ text: data.length });
            }
        }
    });
}
var defaultChildren = {
    chatUsersCountLabel: {
        blockConstructor: Title,
        blockProps: {
            text: '1',
            size: 'small',
            theme: 'label',
            stylesAfter: 'users-count',
        }
    },
    linkToProfile: {
        blockConstructor: Link,
        blockProps: {
            type: 'routeLink',
            linkTo: 'profile',
            hasText: true,
            text: 'Профиль',
            size: 'small',
            theme: 'label',
            align: 'right',
            stylesAfter: 'icon-arrow-right',
            wrapperStyles: 'profile-link'
        }
    },
    linkShowAddChatPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'dropdown__item',
            image: '<img class="image dropdown__image box box--round-border--circle" src="img/plus.svg" alt="Add chat">' +
                '<span class="text text--size--small">Добавить чат</span>'
        }
    },
    linkCloseAddChatPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'box box--all-viewport-space-fixed'
        }
    },
    linkShowRemoveChatPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'dropdown__item',
            image: '<img class="image dropdown__image box box--round-border--circle" src="img/close.svg" alt="Remove chat">' +
                '<span class="text text--size--small text--theme--danger">Удалить чат</span>'
        }
    },
    linkCloseRemoveChatPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'box box--all-viewport-space-fixed'
        }
    },
    linkShowAddUserPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'dropdown__item',
            image: '<img class="image dropdown__image box box--round-border--circle" src="img/plus.svg" alt="Add member to chat">' +
                '<span class="text text--size--small">Добавить пользователя</span>'
        }
    },
    linkCloseAddUserPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'box box--all-viewport-space-fixed'
        }
    },
    linkShowRemoveUserPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'dropdown__item',
            image: '<img class="image dropdown__image box box--round-border--circle" src="img/close.svg" alt="Remove member from chat">' +
                '<span class="text text--size--small">Удалить пользователя</span>'
        }
    },
    linkCloseRemoveUserPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'box box--all-viewport-space-fixed'
        }
    },
    addChatTitle: {
        blockConstructor: Input,
        blockProps: {
            id: 'title',
            name: 'title',
            placeholder: 'Название',
            hasText: true,
            size: 'small',
            stylesAfter: 'form__input box box--underlined-primary',
            wrapperStyles: 'form__item form__item--big',
            validationType: 'limitedString',
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Название',
                    size: 'tiny',
                    theme: 'label',
                    stylesAfter: 'form__label form__label--with-anim-up',
                    attrs: 'for="title"',
                }
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: '',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg',
                    isHidden: true,
                }
            }
        }
    },
    buttonAddChat: {
        blockConstructor: Button,
        blockProps: {
            type: 'submit',
            isDisabled: false,
            formMethod: 'POST',
            hasText: true,
            text: 'Добавить чат',
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
            isDisabled: false,
            formMethod: 'POST',
            hasText: true,
            text: 'Удалить чат',
            size: 'small',
            theme: 'light',
            weight: 'bold',
            wrapperStyles: 'form__button',
        }
    },
    buttonAddUser: {
        blockConstructor: Button,
        blockProps: {
            type: 'submit',
            isDisabled: false,
            formMethod: 'POST',
            hasText: true,
            text: 'Добавить пользователя',
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
            isDisabled: false,
            formMethod: 'POST',
            hasText: true,
            text: 'Удалить пользователя',
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
            isDisabled: false,
            formMethod: 'POST',
            hasText: false,
            stylesAfter: 'send icon-arrow-right',
            image: '<img src="img/arrow-back-btn.svg" alt="Send message" class="dropdown__icon">'
        }
    },
    addLogin: {
        blockConstructor: Input,
        blockProps: {
            id: 'add-login',
            name: 'add-login',
            placeholder: 'Логин',
            hasText: true,
            size: 'small',
            stylesAfter: 'form__input box box--underlined-primary',
            wrapperStyles: 'form__item form__item--big',
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Логин',
                    size: 'tiny',
                    theme: 'label',
                    stylesAfter: 'form__label form__label--with-anim-up',
                    attrs: 'for="add-login"',
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
    removeLogin: {
        blockConstructor: Input,
        blockProps: {
            id: 'remove-login',
            name: 'remove-login',
            placeholder: 'Логин',
            hasText: true,
            size: 'small',
            stylesAfter: 'form__input box box--underlined-primary',
            wrapperStyles: 'form__item form__item--big',
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Логин',
                    size: 'tiny',
                    theme: 'label',
                    stylesAfter: 'form__label form__label--with-anim-up',
                    attrs: 'for="remove-login"',
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
