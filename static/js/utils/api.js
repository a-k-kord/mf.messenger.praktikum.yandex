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
import { fetchWithRetry, HTTPTransport, METHODS } from "./HTTPTransport.js";
import { getRussianErrorMsg } from "./serverErrors.js";
import { Router } from "../core/Router/index.js";
export var serverHost = 'https://ya-praktikum.tech';
export function registerApi(data) {
    return (new HTTPTransport()).post(serverHost + "/api/v2/auth/signup", {
        method: METHODS.POST,
        withCredentials: true,
        data: data
    });
}
export function loginApi(data) {
    return (new HTTPTransport()).post(serverHost + "/api/v2/auth/signin", {
        method: METHODS.POST,
        withCredentials: true,
        data: data
    });
}
export function logoutApi() {
    return (new HTTPTransport()).post(serverHost + "/api/v2/auth/logout", {
        withCredentials: true,
    });
}
export function saveAvatarApi(data) {
    return (new HTTPTransport()).put(serverHost + "/api/v2/user/profile/avatar", {
        withCredentials: true,
        data: data
    });
}
export function saveProfileApi(data) {
    return (new HTTPTransport()).put(serverHost + "/api/v2/user/profile", {
        withCredentials: true,
        data: data
    });
}
export function savePasswordApi(data) {
    return (new HTTPTransport()).put(serverHost + "/api/v2/user/password", {
        withCredentials: true,
        data: data
    });
}
export function getUserApi() {
    return fetchWithRetry(serverHost + "/api/v2/auth/user", {
        method: METHODS.GET,
        withCredentials: true,
    });
}
export function getChatsApi(chatData) {
    return fetchWithRetry(serverHost + "/api/v2/chats", {
        method: METHODS.GET,
        withCredentials: true,
    });
}
export function getNewMessagesCount(chatData) {
    var chatId = chatData.chatId;
    return fetchWithRetry(serverHost + "/api/v2/chats/new/" + chatId, {
        method: METHODS.GET,
        withCredentials: true,
    });
}
export function addChatApi(chatData) {
    var data = chatData.formInputs;
    return (new HTTPTransport()).post(serverHost + "/api/v2/chats", {
        withCredentials: true,
        data: data
    });
}
export function removeChatApi(chatData) {
    var chatId = chatData.chatId;
    return (new HTTPTransport()).delete(serverHost + "/api/v2/chats", {
        withCredentials: true,
        data: { chatId: chatId }
    });
}
export function addUsersToChatApi(chatData) {
    var login = chatData.formInputs["add-login"], chatId = chatData.chatId;
    return getUsersByLoginApi({ login: login }).then(function (users) {
        if (Array.isArray(users)) {
            var _a = __read(users, 1), userId = _a[0].id;
            return (new HTTPTransport()).put(serverHost + "/api/v2/chats/users", {
                withCredentials: true,
                data: { users: [userId], chatId: chatId }
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
            return (new HTTPTransport()).delete(serverHost + "/api/v2/chats/users", {
                withCredentials: true,
                data: { users: [userId], chatId: chatId }
            });
        }
        throw new Error('Пользователей с таким именем не найдено');
    });
}
export function getUsersByLoginApi(data) {
    return (new HTTPTransport()).post(serverHost + "/api/v2/user/search", {
        withCredentials: true,
        data: data
    });
}
export function getChatUsersApi(chatData) {
    var chatId = chatData.chatId;
    return fetchWithRetry(serverHost + "/api/v2/chats/" + chatId + "/users", {
        method: METHODS.GET,
        withCredentials: true,
    });
}
export function handleApiResponse(xhr) {
    var result;
    var status = xhr.status, response = xhr.response;
    switch (status) {
        case 200:
            result = toJson(response);
            break;
        case 401:
            if (location.pathname !== '/login' && location.pathname !== '/register') {
                Router.__instance.go('/login');
            }
            result = getErrorMsg(response);
            break;
        default:
            result = getErrorMsg(response);
    }
    return result;
}
export function handleError(err, errorBlock) {
    var errorMsg = err.errorMsg, type = err.type;
    if (type === 'timeout' || type === 'error') {
        errorMsg = getRussianErrorMsg(type);
    }
    errorBlock && errorBlock.setProps({ text: errorMsg, isHidden: false });
    console.log('Error catch:', errorMsg);
}
function getErrorMsg(response) {
    return { errorMsg: getRussianErrorMsg(parseErrorMsg(response)) };
}
export function parseErrorMsg(response) {
    var _a;
    var resJson = toJson(response);
    return (_a = resJson.reason) !== null && _a !== void 0 ? _a : resJson.data;
}
export function toJson(data) {
    var json = { data: data };
    try {
        json = JSON.parse(data);
    }
    catch (err) {
    }
    return json;
}
