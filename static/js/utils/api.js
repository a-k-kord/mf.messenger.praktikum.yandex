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
import { fetchWithRetry, HTTPTransport, METHODS } from './HTTPTransport.js';
import { getRussianErrorMsg } from './serverErrors.js';
import { toJson } from './utils.js';
import { Router } from '../core/Router/index.js';
import { SERVER_HOST } from './consts.js';
var httpTransport = new HTTPTransport(SERVER_HOST);
export function registerApi(data) {
    return httpTransport.post('/api/v2/auth/signup', {
        method: METHODS.POST,
        withCredentials: true,
        data: data,
    });
}
export function loginApi(data) {
    return httpTransport.post('/api/v2/auth/signin', {
        method: METHODS.POST,
        withCredentials: true,
        data: data,
    });
}
export function logoutApi() {
    return httpTransport.post('/api/v2/auth/logout', {
        withCredentials: true,
    });
}
export function saveAvatarApi(data) {
    return httpTransport.put('/api/v2/user/profile/avatar', {
        withCredentials: true,
        data: data,
    });
}
export function saveProfileApi(data) {
    return httpTransport.put('/api/v2/user/profile', {
        withCredentials: true,
        data: data,
    });
}
export function savePasswordApi(data) {
    return httpTransport.put('/api/v2/user/password', {
        withCredentials: true,
        data: data,
    });
}
export function getUserApi() {
    return fetchWithRetry(SERVER_HOST, '/api/v2/auth/user', {
        tries: 2,
        method: METHODS.GET,
        withCredentials: true,
    });
}
export function getChatsApi(chatData) {
    return fetchWithRetry(SERVER_HOST, '/api/v2/chats', {
        tries: 2,
        method: METHODS.GET,
        withCredentials: true,
    });
}
export function getNewMessagesCount(chatData) {
    var chatId = chatData.chatId;
    return fetchWithRetry(SERVER_HOST, "/api/v2/chats/new/" + chatId, {
        tries: 2,
        method: METHODS.GET,
        withCredentials: true,
    });
}
export function addChatApi(chatData) {
    var data = chatData.formInputs;
    return httpTransport.post('/api/v2/chats', {
        withCredentials: true,
        data: data,
    });
}
export function removeChatApi(chatData) {
    var chatId = chatData.chatId;
    return httpTransport.delete('/api/v2/chats', {
        withCredentials: true,
        data: { chatId: chatId },
    });
}
export function addUsersToChatApi(chatData) {
    var login = chatData.formInputs["add-login"], chatId = chatData.chatId;
    return getUsersByLoginApi({ login: login }).then(function (users) {
        if (Array.isArray(users)) {
            var _a = __read(users, 1), userId = _a[0].id;
            return httpTransport.put('/api/v2/chats/users', {
                withCredentials: true,
                data: { users: [userId], chatId: chatId },
            });
        }
        throw new Error('Пользователей с таким именем не найдено');
    });
}
export function removeUsersFromChatApi(chatData) {
    var login = chatData.formInputs["remove-login"], chatId = chatData.chatId;
    return getUsersByLoginApi({ login: login }).then(function (users) {
        if (Array.isArray(users)) {
            var _a = __read(users, 1), userId = _a[0].id;
            return httpTransport.delete('/api/v2/chats/users', {
                withCredentials: true,
                data: { users: [userId], chatId: chatId },
            });
        }
        throw new Error('Пользователей с таким именем не найдено');
    });
}
export function getUsersByLoginApi(data) {
    return httpTransport.post('/api/v2/user/search', {
        withCredentials: true,
        data: data,
    });
}
export function getChatUsersApi(chatData) {
    var chatId = chatData.chatId;
    return fetchWithRetry(SERVER_HOST, "/api/v2/chats/" + chatId + "/users", {
        tries: 2,
        method: METHODS.GET,
        withCredentials: true,
    });
}
export function getChatUserTokenApi(chatData) {
    var chatId = chatData.chatId;
    return httpTransport.post("/api/v2/chats/token/" + chatId, {
        method: METHODS.POST,
        withCredentials: true,
    });
}
export function handleApiResponse(xhr) {
    var result;
    var status = xhr.status, response = xhr.response;
    switch (status) {
        case 200:
            return toJson(response);
        case 401:
            if (location.pathname !== '/login' && location.pathname !== '/register') {
                Router.getInstance().go('/login');
            }
            result = getErrorMsg(response);
            break;
        default:
            result = getErrorMsg(response);
    }
    return handleError(result);
}
export function handleError(err, errorBlock) {
    var type = err.type, errorMsg = err.errorMsg;
    var msgText = type === 'timeout' || type === 'error' ? getRussianErrorMsg(type) : errorMsg;
    errorBlock === null || errorBlock === void 0 ? void 0 : errorBlock.setProps({ text: msgText, isHidden: false });
    console.log('Error catch:', msgText);
    return err;
}
function getErrorMsg(response) {
    return { errorMsg: getRussianErrorMsg(parseErrorMsg(response)) };
}
export function parseErrorMsg(response) {
    var _a;
    var resJson = toJson(response);
    return (_a = resJson.reason) !== null && _a !== void 0 ? _a : resJson.data;
}
