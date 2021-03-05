import { Block } from '../core/Block/index';
import { PlainObject } from './utils';
export declare const serverHost = "https://ya-praktikum.tech";
declare type ChatApiData = {
    formInputs?: Record<string, string>;
    chatId?: number | string;
};
export declare function registerApi(data: PlainObject): Promise<PlainObject<unknown>>;
export declare function loginApi(data: PlainObject): Promise<PlainObject<unknown>>;
export declare function logoutApi(): Promise<PlainObject<unknown>>;
export declare function saveAvatarApi(data: any): Promise<PlainObject<unknown>>;
export declare function saveProfileApi(data: PlainObject): Promise<PlainObject<unknown>>;
export declare function savePasswordApi(data: PlainObject): Promise<PlainObject<unknown>>;
export declare function getUserApi(): any;
export declare function getChatsApi(chatData?: ChatApiData): any;
export declare type NewMessagesCountResponse = {
    unread_count: number;
};
export declare function getNewMessagesCount(chatData: ChatApiData): any;
export declare function addChatApi(chatData: ChatApiData): Promise<PlainObject<unknown>>;
export declare function removeChatApi(chatData: ChatApiData): Promise<PlainObject<unknown>>;
export declare function addUsersToChatApi(chatData: ChatApiData): Promise<PlainObject<unknown>>;
export declare function removeUsersFromChatApi(chatData: ChatApiData): Promise<PlainObject<unknown>>;
export declare function getUsersByLoginApi(data: PlainObject): Promise<PlainObject<unknown>>;
export declare function getChatUsersApi(chatData: ChatApiData): any;
export declare function handleApiResponse(xhr: XMLHttpRequest): PlainObject;
export declare function handleError(err: {
    errorMsg?: string;
    type?: string;
}, errorBlock?: Block<object>): PlainObject;
export declare function parseErrorMsg(response: string): string;
export {};
