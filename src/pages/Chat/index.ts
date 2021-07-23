import { compileTemplate } from '../../core/Template/index';
import template from './template';
import { mockChatData } from '../../mockData/Chat';
import { Block, Children, Props } from '../../core/Block/index';
import { Button, ButtonProps } from '../../components/Button/index';
import { Input } from '../../components/Input/index';
import { Title } from '../../components/Title/index';
import { Link, LinkProps } from '../../components/Link/index';
import {
    addChatApi,
    addUsersToChatApi,
    getChatsApi,
    getChatUsersApi, getChatUserTokenApi,
    getNewMessagesCount,
    getUserApi,
    handleError,
    removeChatApi,
    removeUsersFromChatApi,
} from '../../utils/api';
import { PlainObject } from '../../utils/utils';
import { FormInputs } from '../../utils/validation';
import { Router } from '../../core/Router/index';
import { SERVER_HOST } from '../../utils/consts';

export interface ChatProps extends Props {
    myUserId?: number,
    chats?: ChatsData,
    selectedChatItemId?: number
}

interface ChatsData {
    id: {
        title: string,
        avatar?: string,
        lastMessage?: {
            content: string,
            id: number,
            time: string,
            user: PlainObject,
        },
        createdBy: number,
        unreadCount: number,
        usersCount: number,
        messages?: ChatMessageInfo[],
    }
}

interface ChatMessageInfo {
    id?: number,
    chat_id: number,
    time: string,
    type: string,
    user_id: string,
    content: string,
    file?: {
        id: number,
        user_id: number,
        path: string,
        filename: string,
        content_type: string,
        content_size: number,
        upload_date: string,
    },
    is_read?: boolean,
}

export type ApiCallData = {
    apiMethod: () => Promise<XMLHttpRequest>,
    beforeApiMethodCall: () => void,
    afterApiMethodCall: () => void,
    // eslint-disable-next-line no-unused-vars
    callbackWithResponse: (response: PlainObject) => void
}

export class Chat extends Block<ChatProps> {
    static pathname = '/chat';

    private socket: WebSocket;

    private user: PlainObject;

    private infiniteLoader: HTMLElement;

    private infiniteLoaderDivObserver: IntersectionObserver;

    constructor(parentElement: HTMLElement, props: ChatProps, children: Children = defaultChildren, tagName?: string) {
        super(parentElement, props, children, tagName);

        (children.buttonSend.blockProps as ButtonProps).handleMethod = this.sendMessage.bind(this);
        // Настраиваем контролы для модальных окон
        const addChatSelector = '#add-chat-popup';
        (children.linkShowAddChatPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, true, addChatSelector);
        (children.linkCloseAddChatPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, false, addChatSelector);
        (children.buttonAddChat.blockProps as ButtonProps).handleMethod = this.makeApiCall.bind(this, this.childBlocks.buttonAddChat, {
            popupSelector: addChatSelector,
            apiMethod: addChatApi,
            beforeApiMethodCall: () => {
                this.childBlocks.buttonAddChat.setProps({ isDisabled: true });
            },
            afterApiMethodCall: () => {
                this.childBlocks.buttonAddChat.setProps({ isDisabled: false });
            },
            callbackWithResponse: (responseData: PlainObject) => {
                this.togglePopup(false, addChatSelector);
                // this.getChatsFromServer();
            },
        });

        const removeChatSelector = '#remove-chat-popup';
        (children.linkShowRemoveChatPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, true, removeChatSelector);
        (children.linkCloseRemoveChatPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, false, removeChatSelector);
        (children.buttonRemoveChat.blockProps as ButtonProps).handleMethod = this.makeApiCall.bind(this, this.childBlocks.buttonRemoveChat, {
            popupSelector: removeChatSelector,
            apiMethod: removeChatApi,
            beforeApiMethodCall: () => {
                this.childBlocks.buttonRemoveChat.setProps({ isDisabled: true });
            },
            afterApiMethodCall: () => {
                this.childBlocks.buttonRemoveChat.setProps({ isDisabled: false });
            },
            callbackWithResponse: (responseData: PlainObject) => {
                this.togglePopup(false, removeChatSelector);
                this.setProps({ selectedChatItemId: undefined });
                // this.getChatsFromServer();
            },
        });

        const addUserSelector = '#add-user-popup';
        (children.linkShowAddUserPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, true, addUserSelector);
        (children.linkCloseAddUserPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, false, addUserSelector);
        (children.buttonAddUser.blockProps as ButtonProps).handleMethod = this.makeApiCall.bind(this, this.childBlocks.buttonAddUser, {
            popupSelector: addUserSelector,
            apiMethod: addUsersToChatApi,
            beforeApiMethodCall: () => {
                this.childBlocks.buttonAddUser.setProps({ isDisabled: true });
            },
            afterApiMethodCall: () => {
                this.childBlocks.buttonAddUser.setProps({ isDisabled: false });
            },
            callbackWithResponse: (responseData: PlainObject) => {
                if (!responseData.errorMsg) {
                    this.togglePopup(false, addUserSelector);
                    const { text: usersCount } = (this.childBlocks.chatUsersCountLabel as Title).props;
                    this.childBlocks.chatUsersCountLabel.setProps({ text: parseInt(usersCount, 10) + 1 });
                } else {
                    // TODO: error to ErrorNotification Block
                    // console.log(responseData.errorMsg);
                }
            },
        });

        const removeUserSelector = '#remove-user-popup';
        (children.linkShowRemoveUserPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, true, removeUserSelector);
        (children.linkCloseRemoveUserPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, false, removeUserSelector);
        (children.buttonRemoveUser.blockProps as ButtonProps).handleMethod = this.makeApiCall.bind(this, this.childBlocks.buttonRemoveUser, {
            popupSelector: removeUserSelector,
            apiMethod: removeUsersFromChatApi,
            beforeApiMethodCall: () => {
                this.childBlocks.buttonRemoveUser.setProps({ isDisabled: true });
            },
            afterApiMethodCall: () => {
                this.childBlocks.buttonRemoveUser.setProps({ isDisabled: false });
            },
            callbackWithResponse: (responseData: PlainObject) => {
                if (!responseData.errorMsg) {
                    this.togglePopup(false, removeUserSelector);
                    const { text: usersCount } = (this.childBlocks.chatUsersCountLabel as Title).props;
                    this.childBlocks.chatUsersCountLabel.setProps({ text: parseInt(usersCount, 10) - 1 });
                } else {
                    // TODO: error to ErrorNotification Block
                    // console.log(responseData.errorMsg);
                }
            },
        });
    }

    makeApiCall(buttonBlock: Block<ButtonProps>, apiCallData: ApiCallData, formInputs: FormInputs) {
        const { data } = formInputs;
        const {
            apiMethod,
            beforeApiMethodCall,
            afterApiMethodCall,
            callbackWithResponse,
        } = apiCallData;
        beforeApiMethodCall();
        apiMethod.call(this, {
            formInputs: data,
            chatId: this.props.selectedChatItemId,
        })
            .then((response: PlainObject) => {
                afterApiMethodCall();
                if (!data.errorMsg) {
                    callbackWithResponse(response);
                } else {
                    throw new Error(response.errorMsg as string);
                }
            })
            .catch((err) => {
                afterApiMethodCall();
                handleError({ errorMsg: err.message });
            });
    }

    sendMessage(inputs: FormInputs) {
        const { data: { message } } = inputs;
        console.log(inputs);
        this.socket.send(JSON.stringify({
            content: message,
            type: 'message',
        }));
        this.publishMessages([{
            chat_id: this.props.selectedChatItemId,
            time: `${new Date()}`,
            type: 'message',
            user_id: this.user.id as string,
            content: message,
            is_read: false,
        }]);
    }

    getChatsFromServer() {
        getChatsApi()
            .then((chatItems: unknown) => {
                const chats: PlainObject<object> = {};
                if ((chatItems as PlainObject[])?.length) {
                    for (const {
                        id: chatId,
                        title,
                        avatar,
                        created_by: createdBy,
                        last_message: lastMessage,
                        unread_count: unreadCount,
                    } of (chatItems as [])) {
                        const { selectedChatItemId } = this.props;
                        const { messages } = `${selectedChatItemId}` === `${chatId}` && this.props.chats[chatId];
                        chats[chatId] = {
                            title,
                            avatar,
                            createdBy,
                            lastMessage,
                            unreadCount,
                            messages: messages ?? [],
                        };
                        getNewMessagesCount({ chatId })
                            .then((data: PlainObject) => {
                                const newUnreadCount = data?.unread_count || 0;
                                if (unreadCount) {
                                    this.setProps({
                                        chats: {
                                            ...chats,
                                            [chatId]: {
                                                ...chats[chatId],
                                                unreadCount: newUnreadCount,
                                            },
                                        },
                                    });
                                }
                            });
                        getChatUsersApi({ chatId })
                            .then((data: PlainObject) => {
                                if (!data.errorMsg) {
                                    if (Array.isArray(data)) {
                                        this.childBlocks.chatUsersCountLabel.setProps({ text: data.length });
                                        this.setProps({
                                            chats: {
                                                ...chats,
                                                [chatId]: {
                                                    ...chats[chatId],
                                                    usersCount: data.length,
                                                },
                                            },
                                        });
                                    }
                                }
                            });
                    }
                }
                this.setProps({
                    chats: {
                        chats,
                    },
                });
                if (Router.getInstance().currentRoute.pathname === Chat.pathname) {
                    super.show();
                }
            });
    }

    addChatItemHandlers() {
        const chatItemLinks = this.getContent()
            .querySelectorAll('.chat-item > a');
        chatItemLinks.forEach((item: HTMLElement) => {
            this.addListener(item, 'click', handleSelectChatItem.bind(this), 'a');
        });
    }

    removeChatItemHandlers() {
        const chatItemLinks = this.getContent()
            .querySelectorAll('.chat-item > a');
        chatItemLinks.forEach((item: HTMLElement) => {
            this.removeAllListenersByEvent(item, 'click');
        });
    }

    setProps(nextProps: object) {
        super.setProps(nextProps);
    }

    public show() {
        // Получаем авторизованного юзера
        getUserApi()
            .then((userData: PlainObject) => {
                this.user = userData;
                this.setProps({ myUserId: userData.id });
                if (!userData.errorMsg) {
                    // Получаем чаты
                    this.getChatsFromServer();
                    // const chatsGetterId = setInterval(() => {
                    //     if (location.pathname === Chat.pathname) {
                    //         this.getChatsFromServer();
                    //     } else {
                    //         clearInterval(chatsGetterId);
                    //     }
                    // }, 10000);
                }
            })
            .catch((err) => {
                handleError({ errorMsg: err.message });
            });
    }

    publishMessage(newMsgObj: ChatMessageInfo) {
        const {
            chats,
            selectedChatItemId,
        } = this.props;
        const chatId = `${selectedChatItemId}`;
        const messages = chats[chatId].messages
            ? chats[chatId].messages.map((msg) => {
                if (!msg.id && newMsgObj.content === msg.content && (new Date(newMsgObj.time)).getTime() === (new Date(msg.time)).getTime()) {
                    return newMsgObj;
                }
                return msg;
            })
            : [];

        this.setProps({
            chats: {
                ...chats,
                [chatId]: {
                    ...chats[chatId],
                    lastMessage: newMsgObj,
                    messages: [newMsgObj, ...messages],
                },
            },
        });
    }

    publishMessages(msgArr: ChatMessageInfo[]) {
        const {
            chats,
            selectedChatItemId,
        } = this.props;
        const chatId = `${selectedChatItemId}`;
        const mergedMessagesMap = {};
        let newLocalMessages = [];
        if (chats[chatId].messages && chats[chatId].messages.length) {
            const { messages } = chats[chatId];
            // сохраняем отдельно локальные сообщения без id
            newLocalMessages = messages.filter((msg) => !msg.id);
            // делаем словарь сообщений по ключу id
            messages.map((msg) => {
                if (msg.id) {
                    mergedMessagesMap[msg.id] = msg;
                }
            });
        }
        if (msgArr.length) {
            // если id совпадает, перезаписываем сообщениями с сервера
            msgArr.map((msg) => {
                if (msg.id) {
                    mergedMessagesMap[msg.id] = msg;
                    // убираем локальные сообщения, которые уже пришли с сервера
                    newLocalMessages = newLocalMessages.filter(
                        (newLocalMessage) => newLocalMessage.content !== msg.content
                            || (new Date(newLocalMessage.time)).getTime() !== (new Date(msg.time)).getTime(),
                    );
                } else {
                    newLocalMessages.push(msg);
                }
            });
            // берем сформированное множество сообщений
            msgArr = Object.values(mergedMessagesMap);
            // добавляем локальные
            if (newLocalMessages.length) {
                msgArr.map((msg) => {
                    // убираем локальные сообщения, которые уже пришли с сервера
                    newLocalMessages = newLocalMessages.filter(
                        (newLocalMessage) => newLocalMessage.content !== msg.content
                            || (new Date(newLocalMessage.time)).getTime() !== (new Date(msg.time)).getTime(),
                    );
                });
                msgArr = msgArr.concat(newLocalMessages);
            }

// сортируем по дате
            msgArr.sort((a, b) => ((new Date(b.time)).getTime() - (new Date(a.time)).getTime()));

            this.setProps({
                chats: {
                    ...chats,
                    [chatId]: {
                        ...chats[chatId],
                        lastMessage: msgArr.length ? msgArr[0] : chats[chatId].lastMessage,
                        messages: msgArr,
                    },
                },
            });
        }
    }

    render(): string {
        return compileTemplate<ChatProps>(template, {
            props: {
                ...this.props,
                // messages: mockChatData,
            },
            slots: { ...this.slots },
        });
    }

    beforeRender() {
        this.removeChatItemHandlers();
    }

    afterRender() {
        this.addChatItemHandlers();
        this.infiniteLoader = document.querySelector('.load-more-messages');
        if (this.infiniteLoader) {
            if (this.infiniteLoaderDivObserver) {
                this.infiniteLoaderDivObserver.unobserve(this.infiniteLoader);
                console.log('Observer shutdown');
            }
            this.infiniteLoaderDivObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.intersectionRatio > 0) {
                            console.log('Msg lazy loader is viewable. Loading...');
                            const { id: userId } = this.user;
                            const { selectedChatItemId: chatId } = this.props;
                            const offset = this.props.chats[chatId].messages?.length;
                            if (offset) {
                                getOldMessages.call(this, userId, chatId, offset);
                            }
                        }
                    } else {
                        console.log('Msg lazy loader is not viewable');
                    }
                });
            });
            this.infiniteLoaderDivObserver.observe(this.infiniteLoader);
            console.log('Observer inited');
        }
    }
}

function getOldMessages(userId, chatId, offset = 0) {
    if (this.socket && this.socket.readyState === 1) {
        this.socket.send(JSON.stringify({
            content: `${offset}`,
            type: 'get old',
        }));
    } else {
        console.log('Failed to get old messages. Socket is not ready.', '\nWaiting for socket...');
        const waiterId = setInterval(() => {
            console.log('Waiting for socket...');
            const { socket: currentSocket } = this;
            if (currentSocket) {
                if (!isSocketBelongsToChat.call(this, chatId)) {
                    currentSocket.close(1000);
                }
                if (currentSocket.readyState === 1) {
                    console.log('Socket is open again.', 'Getting old messages...');
                    currentSocket.send(JSON.stringify({
                        content: `${offset}`,
                        type: 'get old',
                    }));
                    clearInterval(waiterId);
                }
            } else {
                clearInterval(waiterId);
                openSocketAndGetOldMessages.call(this, userId, chatId);
            }
        }, 1000);
    }
}

function openSocket(userId, chatId, token) {
    let pingerId;
    if (this.socket) {
        this.socket.close(1000);
    }
    this.socket = new WebSocket(`${SERVER_HOST.replace('https', 'wss')}/ws/chats/${userId}/${chatId}/${token}`);

    this.socket.addEventListener('open', () => {
        console.log(`Соединение установлено. Чат: ${chatId}`);
        clearInterval(pingerId);
        pingerId = setInterval(() => {
            if (!this.socket) {
                clearInterval(pingerId);
            } else if (this.socket.readyState === 1) {
                this.socket.send(JSON.stringify({
                    type: 'ping',
                }));
            } else if ([2, 3].includes(this.socket.readyState)) {
                clearInterval(pingerId);
            }
        }, 5000);
    });

    this.socket.addEventListener('close', (event) => {
        clearInterval(pingerId);
        this.socket = null;
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
            console.log(`Код: ${event.code} | Причина: ${event.reason} | Чат: ${chatId}`);
        } else {
            console.log('Обрыв соединения');
            console.log(`Код: ${event.code} | Причина: ${event.reason} | Чат: ${chatId}`);
            console.log(`Восстанавливаем wss соединение с чатом: ${chatId}`);
            const newSocket = new WebSocket(`${SERVER_HOST.replace('https', 'wss')}/ws/chats/${userId}/${chatId}/${token}`);
            if (newSocket) {
                this.socket = newSocket;
            } else {
                handleError({ errorMsg: `Не удалось восстановить wss соединение с чатом: ${chatId}` });
            }
        }
    });

    this.socket.addEventListener('message', (event) => {
        console.log(`${chatId}: `, 'Получены данные', event.data);
        try {
            const msgObj: ChatMessageInfo | ChatMessageInfo[] = JSON.parse(event.data);
            if ('type' in msgObj && msgObj.type === 'message') {
                this.publishMessages([msgObj]);
            } else if (Array.isArray(msgObj)) {
                this.publishMessages(msgObj);
            }
        } catch (e) {
            handleError({ errorMsg: `Ошибка в парсинге ответа от сервера для чата ${chatId}: ${e.message}` });
        }
    });

    this.socket.addEventListener('error', (error) => {
        console.log('Ошибка', error); // .message
        handleError({ errorMsg: `Ошибка wss соединения с чатом ${chatId}: ${error}` });
    });
}

function isSocketBelongsToChat(chatId: string) {
    const { id: userId } = this.user;
    return this.socket.url.indexOf(`/ws/chats/${userId}/${chatId}`) !== -1;
}

function openSocketAndGetOldMessages(userId, chatId) {
    getChatUserTokenApi({ chatId })
        .then((data: PlainObject) => {
            const {
                token,
                errorMsg,
            } = data;
            if (token) {
                openSocket.call(this, userId, chatId, token);
                getOldMessages.call(this, userId, chatId);
            } else if (errorMsg) {
                throw new Error(`Не удалось открыть websocket: ${data.errorMsg}`);
            }
        })
        .catch((err) => {
            // TODO: notify error
            handleError({ errorMsg: err.message });
        });
}

function handleSelectChatItem(evt: Event) {
    const chatId = (evt.currentTarget as HTMLElement).getAttribute('data-chat-item-id');
    this.setProps({ selectedChatItemId: chatId });

    if (this.user) {
        const { id: userId } = this.user;
        // если уже есть сокет к этому чату
        if (this.socket && isSocketBelongsToChat.call(this, chatId) && [0, 1].includes(this.socket.readyState)) {
            getOldMessages.call(this, userId, chatId);
        } else {
            openSocketAndGetOldMessages.call(this, userId, chatId);
        }

        getChatUsersApi({ chatId })
            .then((data: PlainObject) => {
                if (!data.errorMsg) {
                    if (Array.isArray(data)) {
                        this.childBlocks.chatUsersCountLabel.setProps({ text: data.length });
                    }
                }
            });
    }
}

const defaultChildren = {
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

    // linkShowAddChatPopup, linkCloseAddChatPopup, linkShowRemoveChatPopup, linkCloseRemoveChatPopup,
    // linkShowAddUserPopup, linkCloseAddUserPopup, linkShowRemoveUserPopup, linkCloseRemoveUserPopup
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

    // <input class="message-input" type="text" placeholder="Сообщение" value="" id="message"
// name="message">
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
            // formMethod: 'POST',
            hasText: false,
            stylesAfter: 'send icon-arrow-right',
            // TODO: поменять когда будет готов компонент Image
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
