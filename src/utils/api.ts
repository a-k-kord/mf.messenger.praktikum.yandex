import { fetchWithRetry, HTTPTransport, METHODS } from "./HTTPTransport.js";
import { Block } from "../core/Block/index.js";
import { getRussianErrorMsg } from "./serverErrors.js";
import { PlainObject } from "./utils.js";
import { Router } from "../core/Router/index.js";

export const serverHost = 'https://ya-praktikum.tech';


type ChatApiData = {
    formInputs?: Record<string, string>,
    chatId?: number | string
}

export function registerApi(data: PlainObject) {
    return (new HTTPTransport()).post(`${serverHost}/api/v2/auth/signup`, {
        method: METHODS.POST,
        withCredentials: true,
        data
    });
}

export function loginApi(data: PlainObject) {
    return (new HTTPTransport()).post(`${serverHost}/api/v2/auth/signin`, {
        method: METHODS.POST,
        withCredentials: true,
        data
    });
}

export function logoutApi() {
    return (new HTTPTransport()).post(`${serverHost}/api/v2/auth/logout`, {
        withCredentials: true,
    });
}

export function saveAvatarApi(data) {
    return (new HTTPTransport()).put(`${serverHost}/api/v2/user/profile/avatar`, {
        withCredentials: true,
        data
    });
}

export function saveProfileApi(data: PlainObject) {
    return (new HTTPTransport()).put(`${serverHost}/api/v2/user/profile`, {
        withCredentials: true,
        data
    });
}

export function savePasswordApi(data: PlainObject) {
    return (new HTTPTransport()).put(`${serverHost}/api/v2/user/password`, {
        withCredentials: true,
        data
    });
}

export function getUserApi() {
    return fetchWithRetry(`${serverHost}/api/v2/auth/user`, {
        method: METHODS.GET,
        withCredentials: true,
    });
}

export function getChatsApi(chatData?: ChatApiData) {
    return fetchWithRetry(`${serverHost}/api/v2/chats`, {
        method: METHODS.GET,
        withCredentials: true,
    });
}

export type NewMessagesCountResponse = {
    unread_count: number
}

export function getNewMessagesCount(chatData: ChatApiData) {
    const { chatId } = chatData;
    return fetchWithRetry(`${serverHost}/api/v2/chats/new/${chatId}`, {
        method: METHODS.GET,
        withCredentials: true,
    });
}

export function addChatApi(chatData: ChatApiData) {
    const { formInputs: data } = chatData;
    return (new HTTPTransport()).post(`${serverHost}/api/v2/chats`, {
        withCredentials: true,
        data
    });
}

export function removeChatApi(chatData: ChatApiData) {
    const { chatId } = chatData;
    return (new HTTPTransport()).delete(`${serverHost}/api/v2/chats`, {
        withCredentials: true,
        data: { chatId }
    });
}

export function addUsersToChatApi(chatData: ChatApiData) {
    const { formInputs: {'add-login': login}, chatId } = chatData;
    return getUsersByLoginApi({login}).then((users: unknown) => {
        // TODO: выводить список юзеров с возможностью выбора
        if(Array.isArray(users)) {
            const [{id: userId}] = users as PlainObject[];
            return (new HTTPTransport()).put(`${serverHost}/api/v2/chats/users`, {
                withCredentials: true,
                data: {users:[userId], chatId}
            });
        }
        throw new Error('Пользователей с таким именем не найдено');
    });
}

export function removeUsersFromChatApi(chatData: ChatApiData) {
    const { formInputs: {'remove-login': login}, chatId } = chatData;
    return getUsersByLoginApi({login}).then((users: unknown) => {
        // TODO: выводить список юзеров с возможностью выбора
        if(Array.isArray(users)) {
            const [{id: userId}] = users as PlainObject[];
            return (new HTTPTransport()).delete(`${serverHost}/api/v2/chats/users`, {
                withCredentials: true,
                data: {users:[userId], chatId}
            });
        }
        throw new Error('Пользователей с таким именем не найдено');
    });
}

export function getUsersByLoginApi(data: PlainObject) {
    return (new HTTPTransport()).post(`${serverHost}/api/v2/user/search`, {
        withCredentials: true,
        data
    });
}

export function getChatUsersApi(chatData: ChatApiData) {
    const { chatId } = chatData;
    return fetchWithRetry(`${serverHost}/api/v2/chats/${chatId}/users`, {
        method: METHODS.GET,
        withCredentials: true,
    });
}


export function handleApiResponse<TDataType>(xhr: XMLHttpRequest): TDataType {
    let result;
    const {status, response}: {status: number, response: string} = xhr;
    switch(status) {
        case 200:
            result = toJson(response);
            break;
        case 401:
            if(location.pathname !== '/login') {
                Router.__instance.go('/login');
            }
            result = {errorMsg: getErrorMsg(response)};
            break;
        default://(errors: 400, 500)
            result = {errorMsg: getErrorMsg(response)};
    }
    return result;
}

export function handleError(err: {errorMsg?: string, type?: string}, errorBlock?: Block<object>) {
        let { errorMsg, type } = err;
        if(type === 'timeout' || type === 'error') {
            errorMsg = getRussianErrorMsg(type);
        }
        errorBlock && errorBlock.setProps({text: errorMsg, isHidden: false});
        console.log('Error catch:', errorMsg);
}

function getErrorMsg(response) {
    return {errorMsg: getRussianErrorMsg(parseErrorMsg(response))};
}


export function parseErrorMsg(response: string): string {
    const resJson = toJson(response) as {
        reason?: string,
        data?:string
    };

    return resJson.reason ?? resJson.data;
}

export function toJson(data: string): PlainObject {
    let json = { data };
    try {
        json = JSON.parse(data);
    } catch(err) {
    }
    return json;
}