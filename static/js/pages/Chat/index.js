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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from '../../core/Block/index.js';
import { Button } from '../../components/Button/index.js';
import { Input } from '../../components/Input/index.js';
import { Title } from '../../components/Title/index.js';
import { Link } from '../../components/Link/index.js';
import { addChatApi, addUsersToChatApi, getChatsApi, getChatUsersApi, getChatUserTokenApi, getNewMessagesCount, getUserApi, handleError, removeChatApi, removeUsersFromChatApi, } from '../../utils/api.js';
import { Router } from '../../core/Router/index.js';
import { SERVER_HOST } from '../../utils/consts.js';
var Chat = (function (_super) {
    __extends(Chat, _super);
    function Chat(parentElement, props, children, tagName) {
        if (children === void 0) { children = defaultChildren; }
        var _this = _super.call(this, parentElement, props, children, tagName) || this;
        children.buttonSend.blockProps.handleMethod = _this.sendMessage.bind(_this);
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
            },
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
                _this.setProps({ selectedChatItemId: undefined });
            },
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
                    var usersCount = _this.childBlocks.chatUsersCountLabel.props.text;
                    _this.childBlocks.chatUsersCountLabel.setProps({ text: parseInt(usersCount, 10) + 1 });
                }
                else {
                }
            },
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
                    _this.childBlocks.chatUsersCountLabel.setProps({ text: parseInt(usersCount, 10) - 1 });
                }
                else {
                }
            },
        });
        return _this;
    }
    Chat.prototype.makeApiCall = function (buttonBlock, apiCallData, formInputs) {
        var data = formInputs.data;
        var apiMethod = apiCallData.apiMethod, beforeApiMethodCall = apiCallData.beforeApiMethodCall, afterApiMethodCall = apiCallData.afterApiMethodCall, callbackWithResponse = apiCallData.callbackWithResponse;
        beforeApiMethodCall();
        apiMethod.call(this, {
            formInputs: data,
            chatId: this.props.selectedChatItemId,
        })
            .then(function (response) {
            afterApiMethodCall();
            if (!data.errorMsg) {
                callbackWithResponse(response);
            }
            else {
                throw new Error(response.errorMsg);
            }
        })
            .catch(function (err) {
            afterApiMethodCall();
            handleError({ errorMsg: err.message });
        });
    };
    Chat.prototype.sendMessage = function (inputs) {
        var message = inputs.data.message;
        console.log(inputs);
        this.socket.send(JSON.stringify({
            content: message,
            type: 'message',
        }));
        this.publishMessages([{
                chat_id: this.props.selectedChatItemId,
                time: "" + new Date(),
                type: 'message',
                user_id: this.user.id,
                content: message,
                is_read: false,
            }]);
    };
    Chat.prototype.getChatsFromServer = function () {
        var _this = this;
        getChatsApi()
            .then(function (chatItems) {
            var e_1, _a;
            var _b;
            var chats = {};
            if ((_b = chatItems) === null || _b === void 0 ? void 0 : _b.length) {
                var _loop_1 = function (chatId, title, avatar, createdBy, lastMessage, unreadCount) {
                    var selectedChatItemId = _this.props.selectedChatItemId;
                    var messages = ("" + selectedChatItemId === "" + chatId && _this.props.chats[chatId]).messages;
                    chats[chatId] = {
                        title: title,
                        avatar: avatar,
                        createdBy: createdBy,
                        lastMessage: lastMessage,
                        unreadCount: unreadCount,
                        messages: messages !== null && messages !== void 0 ? messages : [],
                    };
                    getNewMessagesCount({ chatId: chatId })
                        .then(function (data) {
                        var _a;
                        var newUnreadCount = (data === null || data === void 0 ? void 0 : data.unread_count) || 0;
                        if (unreadCount) {
                            _this.setProps({
                                chats: __assign(__assign({}, chats), (_a = {}, _a[chatId] = __assign(__assign({}, chats[chatId]), { unreadCount: newUnreadCount }), _a)),
                            });
                        }
                    });
                    getChatUsersApi({ chatId: chatId })
                        .then(function (data) {
                        var _a;
                        if (!data.errorMsg) {
                            if (Array.isArray(data)) {
                                _this.childBlocks.chatUsersCountLabel.setProps({ text: data.length });
                                _this.setProps({
                                    chats: __assign(__assign({}, chats), (_a = {}, _a[chatId] = __assign(__assign({}, chats[chatId]), { usersCount: data.length }), _a)),
                                });
                            }
                        }
                    });
                };
                try {
                    for (var _c = __values(chatItems), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var _e = _d.value, chatId = _e.id, title = _e.title, avatar = _e.avatar, createdBy = _e.created_by, lastMessage = _e.last_message, unreadCount = _e.unread_count;
                        _loop_1(chatId, title, avatar, createdBy, lastMessage, unreadCount);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            _this.setProps({
                chats: {
                    chats: chats,
                },
            });
            if (Router.getInstance().currentRoute.pathname === Chat.pathname) {
                _super.prototype.show.call(_this);
            }
        });
    };
    Chat.prototype.addChatItemHandlers = function () {
        var _this = this;
        var chatItemLinks = this.getContent()
            .querySelectorAll('.chat-item > a');
        chatItemLinks.forEach(function (item) {
            _this.addListener(item, 'click', handleSelectChatItem.bind(_this), 'a');
        });
    };
    Chat.prototype.removeChatItemHandlers = function () {
        var _this = this;
        var chatItemLinks = this.getContent()
            .querySelectorAll('.chat-item > a');
        chatItemLinks.forEach(function (item) {
            _this.removeAllListenersByEvent(item, 'click');
        });
    };
    Chat.prototype.setProps = function (nextProps) {
        _super.prototype.setProps.call(this, nextProps);
    };
    Chat.prototype.show = function () {
        var _this = this;
        getUserApi()
            .then(function (userData) {
            _this.user = userData;
            _this.setProps({ myUserId: userData.id });
            if (!userData.errorMsg) {
                _this.getChatsFromServer();
            }
        })
            .catch(function (err) {
            handleError({ errorMsg: err.message });
        });
    };
    Chat.prototype.publishMessage = function (newMsgObj) {
        var _a;
        var _b = this.props, chats = _b.chats, selectedChatItemId = _b.selectedChatItemId;
        var chatId = "" + selectedChatItemId;
        var messages = chats[chatId].messages
            ? chats[chatId].messages.map(function (msg) {
                if (!msg.id && newMsgObj.content === msg.content && (new Date(newMsgObj.time)).getTime() === (new Date(msg.time)).getTime()) {
                    return newMsgObj;
                }
                return msg;
            })
            : [];
        this.setProps({
            chats: __assign(__assign({}, chats), (_a = {}, _a[chatId] = __assign(__assign({}, chats[chatId]), { lastMessage: newMsgObj, messages: __spreadArray([newMsgObj], __read(messages)) }), _a)),
        });
    };
    Chat.prototype.publishMessages = function (msgArr) {
        var _a;
        var _b = this.props, chats = _b.chats, selectedChatItemId = _b.selectedChatItemId;
        var chatId = "" + selectedChatItemId;
        var mergedMessagesMap = {};
        var newLocalMessages = [];
        if (chats[chatId].messages && chats[chatId].messages.length) {
            var messages = chats[chatId].messages;
            newLocalMessages = messages.filter(function (msg) { return !msg.id; });
            messages.map(function (msg) {
                if (msg.id) {
                    mergedMessagesMap[msg.id] = msg;
                }
            });
        }
        if (msgArr.length) {
            msgArr.map(function (msg) {
                if (msg.id) {
                    mergedMessagesMap[msg.id] = msg;
                    newLocalMessages = newLocalMessages.filter(function (newLocalMessage) { return newLocalMessage.content !== msg.content
                        || (new Date(newLocalMessage.time)).getTime() !== (new Date(msg.time)).getTime(); });
                }
                else {
                    newLocalMessages.push(msg);
                }
            });
            msgArr = Object.values(mergedMessagesMap);
            if (newLocalMessages.length) {
                msgArr.map(function (msg) {
                    newLocalMessages = newLocalMessages.filter(function (newLocalMessage) { return newLocalMessage.content !== msg.content
                        || (new Date(newLocalMessage.time)).getTime() !== (new Date(msg.time)).getTime(); });
                });
                msgArr = msgArr.concat(newLocalMessages);
            }
            msgArr.sort(function (a, b) { return ((new Date(b.time)).getTime() - (new Date(a.time)).getTime()); });
            this.setProps({
                chats: __assign(__assign({}, chats), (_a = {}, _a[chatId] = __assign(__assign({}, chats[chatId]), { lastMessage: msgArr.length ? msgArr[0] : chats[chatId].lastMessage, messages: msgArr }), _a)),
            });
        }
    };
    Chat.prototype.render = function () {
        return compileTemplate(template, {
            props: __assign({}, this.props),
            slots: __assign({}, this.slots),
        });
    };
    Chat.prototype.beforeRender = function () {
        this.removeChatItemHandlers();
    };
    Chat.prototype.afterRender = function () {
        var _this = this;
        this.addChatItemHandlers();
        this.infiniteLoader = document.querySelector('.load-more-messages');
        if (this.infiniteLoader) {
            if (this.infiniteLoaderDivObserver) {
                this.infiniteLoaderDivObserver.unobserve(this.infiniteLoader);
                console.log('Observer shutdown');
            }
            this.infiniteLoaderDivObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    var _a;
                    if (entry.isIntersecting) {
                        if (entry.intersectionRatio > 0) {
                            console.log('Msg lazy loader is viewable. Loading...');
                            var userId = _this.user.id;
                            var chatId = _this.props.selectedChatItemId;
                            var offset = (_a = _this.props.chats[chatId].messages) === null || _a === void 0 ? void 0 : _a.length;
                            if (offset) {
                                getOldMessages.call(_this, userId, chatId, offset);
                            }
                        }
                    }
                    else {
                        console.log('Msg lazy loader is not viewable');
                    }
                });
            });
            this.infiniteLoaderDivObserver.observe(this.infiniteLoader);
            console.log('Observer inited');
        }
    };
    Chat.pathname = '/chat';
    return Chat;
}(Block));
export { Chat };
function getOldMessages(userId, chatId, offset) {
    var _this = this;
    if (offset === void 0) { offset = 0; }
    if (this.socket && this.socket.readyState === 1) {
        this.socket.send(JSON.stringify({
            content: "" + offset,
            type: 'get old',
        }));
    }
    else {
        console.log('Failed to get old messages. Socket is not ready.', '\nWaiting for socket...');
        var waiterId_1 = setInterval(function () {
            console.log('Waiting for socket...');
            var currentSocket = _this.socket;
            if (currentSocket) {
                if (!isSocketBelongsToChat.call(_this, chatId)) {
                    currentSocket.close(1000);
                }
                if (currentSocket.readyState === 1) {
                    console.log('Socket is open again.', 'Getting old messages...');
                    currentSocket.send(JSON.stringify({
                        content: "" + offset,
                        type: 'get old',
                    }));
                    clearInterval(waiterId_1);
                }
            }
            else {
                clearInterval(waiterId_1);
                openSocketAndGetOldMessages.call(_this, userId, chatId);
            }
        }, 1000);
    }
}
function openSocket(userId, chatId, token) {
    var _this = this;
    var pingerId;
    if (this.socket) {
        this.socket.close(1000);
    }
    this.socket = new WebSocket(SERVER_HOST.replace('https', 'wss') + "/ws/chats/" + userId + "/" + chatId + "/" + token);
    this.socket.addEventListener('open', function () {
        console.log("\u0421\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E. \u0427\u0430\u0442: " + chatId);
        clearInterval(pingerId);
        pingerId = setInterval(function () {
            if (!_this.socket) {
                clearInterval(pingerId);
            }
            else if (_this.socket.readyState === 1) {
                _this.socket.send(JSON.stringify({
                    type: 'ping',
                }));
            }
            else if ([2, 3].includes(_this.socket.readyState)) {
                clearInterval(pingerId);
            }
        }, 5000);
    });
    this.socket.addEventListener('close', function (event) {
        clearInterval(pingerId);
        _this.socket = null;
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
            console.log("\u041A\u043E\u0434: " + event.code + " | \u041F\u0440\u0438\u0447\u0438\u043D\u0430: " + event.reason + " | \u0427\u0430\u0442: " + chatId);
        }
        else {
            console.log('Обрыв соединения');
            console.log("\u041A\u043E\u0434: " + event.code + " | \u041F\u0440\u0438\u0447\u0438\u043D\u0430: " + event.reason + " | \u0427\u0430\u0442: " + chatId);
            console.log("\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u043C wss \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0441 \u0447\u0430\u0442\u043E\u043C: " + chatId);
            var newSocket = new WebSocket(SERVER_HOST.replace('https', 'wss') + "/ws/chats/" + userId + "/" + chatId + "/" + token);
            if (newSocket) {
                _this.socket = newSocket;
            }
            else {
                handleError({ errorMsg: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C wss \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0441 \u0447\u0430\u0442\u043E\u043C: " + chatId });
            }
        }
    });
    this.socket.addEventListener('message', function (event) {
        console.log(chatId + ": ", 'Получены данные', event.data);
        try {
            var msgObj = JSON.parse(event.data);
            if ('type' in msgObj && msgObj.type === 'message') {
                _this.publishMessages([msgObj]);
            }
            else if (Array.isArray(msgObj)) {
                _this.publishMessages(msgObj);
            }
        }
        catch (e) {
            handleError({ errorMsg: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043F\u0430\u0440\u0441\u0438\u043D\u0433\u0435 \u043E\u0442\u0432\u0435\u0442\u0430 \u043E\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u0434\u043B\u044F \u0447\u0430\u0442\u0430 " + chatId + ": " + e.message });
        }
    });
    this.socket.addEventListener('error', function (error) {
        console.log('Ошибка', error);
        handleError({ errorMsg: "\u041E\u0448\u0438\u0431\u043A\u0430 wss \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u044F \u0441 \u0447\u0430\u0442\u043E\u043C " + chatId + ": " + error });
    });
}
function isSocketBelongsToChat(chatId) {
    var userId = this.user.id;
    return this.socket.url.indexOf("/ws/chats/" + userId + "/" + chatId) !== -1;
}
function openSocketAndGetOldMessages(userId, chatId) {
    var _this = this;
    getChatUserTokenApi({ chatId: chatId })
        .then(function (data) {
        var token = data.token, errorMsg = data.errorMsg;
        if (token) {
            openSocket.call(_this, userId, chatId, token);
            getOldMessages.call(_this, userId, chatId);
        }
        else if (errorMsg) {
            throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C websocket: " + data.errorMsg);
        }
    })
        .catch(function (err) {
        handleError({ errorMsg: err.message });
    });
}
function handleSelectChatItem(evt) {
    var _this = this;
    var chatId = evt.currentTarget.getAttribute('data-chat-item-id');
    this.setProps({ selectedChatItemId: chatId });
    if (this.user) {
        var userId = this.user.id;
        if (this.socket && isSocketBelongsToChat.call(this, chatId) && [0, 1].includes(this.socket.readyState)) {
            getOldMessages.call(this, userId, chatId);
        }
        else {
            openSocketAndGetOldMessages.call(this, userId, chatId);
        }
        getChatUsersApi({ chatId: chatId })
            .then(function (data) {
            if (!data.errorMsg) {
                if (Array.isArray(data)) {
                    _this.childBlocks.chatUsersCountLabel.setProps({ text: data.length });
                }
            }
        });
    }
}
var defaultChildren = {
    chatUsersCountLabel: {
        blockConstructor: Title,
        blockProps: {
            text: '1',
            size: 'small',
            theme: 'label',
            stylesAfter: 'users-count',
        },
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
            wrapperStyles: 'profile-link',
        },
    },
    linkShowAddChatPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'dropdown__item',
            image: '<img class="image dropdown__image box box--round-border--circle" src="img/plus.svg" alt="Add chat">'
                + '<span class="text text--size--small">Добавить чат</span>',
        },
    },
    linkCloseAddChatPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'box box--all-viewport-space-fixed',
        },
    },
    linkShowRemoveChatPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'dropdown__item',
            image: '<img class="image dropdown__image box box--round-border--circle" src="img/close.svg" alt="Remove chat">'
                + '<span class="text text--size--small text--theme--danger">Удалить чат</span>',
        },
    },
    linkCloseRemoveChatPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'box box--all-viewport-space-fixed',
        },
    },
    linkShowAddUserPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'dropdown__item',
            image: '<img class="image dropdown__image box box--round-border--circle" src="img/plus.svg" alt="Add member to chat">'
                + '<span class="text text--size--small">Добавить пользователя</span>',
        },
    },
    linkCloseAddUserPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'box box--all-viewport-space-fixed',
        },
    },
    linkShowRemoveUserPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'dropdown__item',
            image: '<img class="image dropdown__image box box--round-border--circle" src="img/close.svg" alt="Remove member from chat">'
                + '<span class="text text--size--small">Удалить пользователя</span>',
        },
    },
    linkCloseRemoveUserPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'box box--all-viewport-space-fixed',
        },
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
                },
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: '',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg',
                    isHidden: true,
                },
            },
        },
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
        },
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
        },
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
        },
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
        },
    },
    messageToSend: {
        blockConstructor: Input,
        blockProps: {
            id: 'message',
            name: 'message',
            placeholder: 'Сообщение',
            stylesBefore: 'message-input',
        },
    },
    buttonSend: {
        blockConstructor: Button,
        blockProps: {
            type: 'button',
            isDisabled: false,
            hasText: false,
            stylesAfter: 'send icon-arrow-right',
            image: '<img src="img/arrow-back-btn.svg" alt="Send message" class="dropdown__icon">',
        },
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
                },
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Неверный логин',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg',
                    isHidden: true,
                },
            },
        },
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
                },
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Неверный логин',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg',
                    isHidden: true,
                },
            },
        },
    },
};
