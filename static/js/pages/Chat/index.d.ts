import { Block, Children, Props } from '../../core/Block/index.js';
import { ButtonProps } from "../../components/Button/index.js";
import { PlainObject } from "../../utils/utils.js";
import { FormInputs } from "../../utils/validation.js";
export interface ChatProps extends Props {
    chats?: ChatsData;
    mockData?: object;
    selectedChatItemId?: number;
}
interface ChatsData extends PlainObject {
    id: {
        title: string;
        unreadCount: number;
        usersCount: number;
    };
}
export declare type ApiCallData = {
    apiMethod: () => Promise<XMLHttpRequest>;
    beforeApiMethodCall: () => void;
    afterApiMethodCall: () => void;
    callbackWithResponse: (response: PlainObject) => void;
};
export declare class Chat extends Block<ChatProps> {
    constructor(parentElement: HTMLElement, props: ChatProps, children?: Children, tagName?: string);
    makeApiCall(buttonBlock: Block<ButtonProps>, apiCallData: ApiCallData, formInputs: FormInputs): void;
    getChatsFromServer(): void;
    addChatItemHandlers(): void;
    setProps(nextProps: object): void;
    show(): void;
    render(): string;
}
export {};
