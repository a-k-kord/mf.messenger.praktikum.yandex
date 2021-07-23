import { Block, Children, Props } from '../../core/Block/index';
import { ButtonProps } from '../../components/Button/index';
import { PlainObject } from '../../utils/utils';
import { FormInputs } from '../../utils/validation';
export interface ChatProps extends Props {
    myUserId?: number;
    chats?: ChatsData;
    selectedChatItemId?: number;
}
interface ChatsData {
    id: {
        title: string;
        avatar?: string;
        lastMessage?: {
            content: string;
            id: number;
            time: string;
            user: PlainObject;
        };
        createdBy: number;
        unreadCount: number;
        usersCount: number;
        messages?: ChatMessageInfo[];
    };
}
interface ChatMessageInfo {
    id?: number;
    chat_id: number;
    time: string;
    type: string;
    user_id: string;
    content: string;
    file?: {
        id: number;
        user_id: number;
        path: string;
        filename: string;
        content_type: string;
        content_size: number;
        upload_date: string;
    };
    is_read?: boolean;
}
export declare type ApiCallData = {
    apiMethod: () => Promise<XMLHttpRequest>;
    beforeApiMethodCall: () => void;
    afterApiMethodCall: () => void;
    callbackWithResponse: (response: PlainObject) => void;
};
export declare class Chat extends Block<ChatProps> {
    static pathname: string;
    private socket;
    private user;
    private infiniteLoader;
    private infiniteLoaderDivObserver;
    constructor(parentElement: HTMLElement, props: ChatProps, children?: Children, tagName?: string);
    makeApiCall(buttonBlock: Block<ButtonProps>, apiCallData: ApiCallData, formInputs: FormInputs): void;
    sendMessage(inputs: FormInputs): void;
    getChatsFromServer(): void;
    addChatItemHandlers(): void;
    removeChatItemHandlers(): void;
    setProps(nextProps: object): void;
    show(): void;
    publishMessage(newMsgObj: ChatMessageInfo): void;
    publishMessages(msgArr: ChatMessageInfo[]): void;
    render(): string;
    beforeRender(): void;
    afterRender(): void;
}
export {};
