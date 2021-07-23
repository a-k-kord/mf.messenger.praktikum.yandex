import { fetchWithRetry, HTTPTransport, METHODS } from './HTTPTransport';
import { Block } from '../core/Block/index';
import { getRussianErrorMsg } from './serverErrors';
import { PlainObject, toJson } from './utils';
import { Router } from '../core/Router/index';
import { SERVER_HOST } from './consts';

const httpTransport = new HTTPTransport(SERVER_HOST);

type ChatApiData = {
    formInputs?: Record<string, string>,
    chatId?: number | string
}

export function registerApi(data: PlainObject) {
    return httpTransport.post('/api/v2/auth/signup', {
        method: METHODS.POST,
        withCredentials: true,
        data,
    });
}

export function loginApi(data: PlainObject) {
    return httpTransport.post('/api/v2/auth/signin', {
        method: METHODS.POST,
        withCredentials: true,
        data,
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
        data,
    });
}

export function saveProfileApi(data: PlainObject) {
    return httpTransport.put('/api/v2/user/profile', {
        withCredentials: true,
        data,
    });
}

export function savePasswordApi(data: PlainObject) {
    return httpTransport.put('/api/v2/user/password', {
        withCredentials: true,
        data,
    });
}

export function getUserApi() {
    return fetchWithRetry(SERVER_HOST, '/api/v2/auth/user', {
        tries: 2,
        method: METHODS.GET,
        withCredentials: true,
    });
}

export function getChatsApi(chatData?: ChatApiData) {
    return fetchWithRetry(SERVER_HOST, '/api/v2/chats', {
        tries: 2,
        method: METHODS.GET,
        withCredentials: true,
    });
}

export function getNewMessagesCount(chatData: ChatApiData) {
    const { chatId } = chatData;
    return fetchWithRetry(SERVER_HOST, `/api/v2/chats/new/${chatId}`, {
        tries: 2,
        method: METHODS.GET,
        withCredentials: true,
    });
}

export function addChatApi(chatData: ChatApiData) {
    const { formInputs: data } = chatData;
    return httpTransport.post('/api/v2/chats', {
        withCredentials: true,
        data,
    });
}

export function removeChatApi(chatData: ChatApiData) {
    const { chatId } = chatData;
    return httpTransport.delete('/api/v2/chats', {
        withCredentials: true,
        data: { chatId },
    });
}

export function addUsersToChatApi(chatData: ChatApiData) {
    const { formInputs: { 'add-login': login }, chatId } = chatData;
    return getUsersByLoginApi({ login }).then((users: unknown) => {
        // TODO: выводить список юзеров с возможностью выбора
        if (Array.isArray(users)) {
            const [{ id: userId }] = users as PlainObject[];
            return httpTransport.put('/api/v2/chats/users', {
                withCredentials: true,
                data: { users: [userId], chatId },
            });
        }
        throw new Error('Пользователей с таким именем не найдено');
    });
}

export function removeUsersFromChatApi(chatData: ChatApiData) {
    const { formInputs: { 'remove-login': login }, chatId } = chatData;
    return getUsersByLoginApi({ login }).then((users: unknown) => {
        // TODO: выводить список юзеров с возможностью выбора
        if (Array.isArray(users)) {
            const [{ id: userId }] = users as PlainObject[];
            return httpTransport.delete('/api/v2/chats/users', {
                withCredentials: true,
                data: { users: [userId], chatId },
            });
        }
        throw new Error('Пользователей с таким именем не найдено');
    });
}

export function getUsersByLoginApi(data: PlainObject) {
    return httpTransport.post('/api/v2/user/search', {
        withCredentials: true,
        data,
    });
}

export function getChatUsersApi(chatData: ChatApiData) {
    const { chatId } = chatData;
    return fetchWithRetry(SERVER_HOST, `/api/v2/chats/${chatId}/users`, {
        tries: 2,
        method: METHODS.GET,
        withCredentials: true,
    });
}

export function getChatUserTokenApi(chatData: ChatApiData) {
    const { chatId } = chatData;
    return httpTransport.post(`/api/v2/chats/token/${chatId}`, {
        method: METHODS.POST,
        withCredentials: true,
    });
}

export function handleApiResponse(xhr: XMLHttpRequest): PlainObject {
    let result;
    const { status, response }: {status: number, response: string} = xhr;
    switch (status) {
        case 200:
            return toJson(response);
        case 401:
            if (location.pathname !== '/login' && location.pathname !== '/register') {
                Router.getInstance().go('/login');
            }
            result = getErrorMsg(response);
            break;
        default:// (errors: 400, 500)
            result = getErrorMsg(response);
    }
    return handleError(result);
}

export function handleError(
    err: {
        errorMsg?: string,
        type?: string
    },
    errorBlock?: Block<object>,
): PlainObject {
        const { type, errorMsg } = err;
        const msgText = type === 'timeout' || type === 'error' ? getRussianErrorMsg(type) : errorMsg;
        errorBlock?.setProps({ text: msgText, isHidden: false });
        // TODO: если errorBlock явно не задан, выводить ошибку в компонент ErrorNotification,
        //  а пока выводим в консоль
        // console.log('Error catch:', msgText);
        return err;
}

function getErrorMsg(response) {
    return { errorMsg: getRussianErrorMsg(parseErrorMsg(response)) };
}

export function parseErrorMsg(response: string): string {
    const resJson = toJson(response) as {
        reason?: string,
        data?:string
    };

    return resJson.reason ?? resJson.data;
}
