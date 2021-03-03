import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { mockChatData } from '../../mockData/Chat.js';
import { Block, Children, Props } from '../../core/Block/index.js';
import { Button, ButtonProps } from "../../components/Button/index.js";
import { Input } from "../../components/Input/index.js";
import { Title } from "../../components/Title/index.js";
import { Link, LinkProps } from "../../components/Link/index.js";
import {
    addChatApi,
    addUsersToChatApi,
    getChatsApi,
    getChatUsersApi,
    getNewMessagesCount,
    getUserApi,
    handleError,
    NewMessagesCountResponse,
    removeChatApi,
    removeUsersFromChatApi
} from "../../utils/api.js";
import { PlainObject } from "../../utils/utils.js";
import { FormInputs } from "../../utils/validation.js";

export interface ChatProps extends Props {
    chats?: ChatsData,
    mockData?: object,
    selectedChatItemId?: number
}

interface ChatsData extends PlainObject {
    id: {
        title: string,
        unreadCount: number,
        usersCount: number
    }
}

export type ApiCallData = {
    apiMethod: () => Promise<XMLHttpRequest>,
    beforeApiMethodCall: () => void,
    afterApiMethodCall: () => void,
    callbackWithResponse: (response: PlainObject) => void
}

export class Chat extends Block<ChatProps> {

    constructor(parentElement: HTMLElement, props: ChatProps, children: Children = defaultChildren, tagName?: string) {
        super(parentElement, props, children, tagName);

        // Настраиваем контролы для модальных окон
        const addChatSelector = '#add-chat-popup';
        (children.linkShowAddChatPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, true, addChatSelector);
        (children.linkCloseAddChatPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, false, addChatSelector);
        (children.buttonAddChat.blockProps as ButtonProps).handleMethod = this.makeApiCall.bind(this, this.childBlocks.buttonAddChat, {
            popupSelector: addChatSelector,
            apiMethod: addChatApi,
            beforeApiMethodCall: () => {
                this.childBlocks.buttonAddChat.setProps({isDisabled: true});
            },
            afterApiMethodCall: () => {
                this.childBlocks.buttonAddChat.setProps({isDisabled: false});
            },
            callbackWithResponse: (responseData: PlainObject) => {
                this.togglePopup(false, addChatSelector);
                this.getChatsFromServer();
            }
        });

        const removeChatSelector = '#remove-chat-popup';
        (children.linkShowRemoveChatPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, true, removeChatSelector);
        (children.linkCloseRemoveChatPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, false, removeChatSelector);
        (children.buttonRemoveChat.blockProps as ButtonProps).handleMethod = this.makeApiCall.bind(this, this.childBlocks.buttonRemoveChat, {
            popupSelector: removeChatSelector,
            apiMethod: removeChatApi,
            beforeApiMethodCall: () => {
                this.childBlocks.buttonRemoveChat.setProps({isDisabled: true});
            },
            afterApiMethodCall: () => {
                this.childBlocks.buttonRemoveChat.setProps({isDisabled: false});
            },
            callbackWithResponse: (responseData: PlainObject) => {
                this.togglePopup(false, removeChatSelector);
                this.setProps({ selectedChatItemId: undefined });
                this.getChatsFromServer();
            }
        });

        const addUserSelector = '#add-user-popup';
        (children.linkShowAddUserPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, true, addUserSelector);
        (children.linkCloseAddUserPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, false, addUserSelector);
        (children.buttonAddUser.blockProps as ButtonProps).handleMethod = this.makeApiCall.bind(this, this.childBlocks.buttonAddUser, {
            popupSelector: addUserSelector,
            apiMethod: addUsersToChatApi,
            beforeApiMethodCall: () => {
                this.childBlocks.buttonAddUser.setProps({isDisabled: true});
            },
            afterApiMethodCall: () => {
                this.childBlocks.buttonAddUser.setProps({isDisabled: false});
            },
            callbackWithResponse: (responseData: PlainObject) => {
                if(!responseData.errorMsg) {
                    this.togglePopup(false, addUserSelector);
                    const { text: usersCount } = (this.childBlocks.chatUsersCountLabel as Title).props;
                    this.childBlocks.chatUsersCountLabel.setProps({text: parseInt(usersCount) + 1});
                } else {
                    console.log(responseData.errorMsg);
                }
            }
        });

        const removeUserSelector = '#remove-user-popup';
        (children.linkShowRemoveUserPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, true, removeUserSelector);
        (children.linkCloseRemoveUserPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, false, removeUserSelector);
        (children.buttonRemoveUser.blockProps as ButtonProps).handleMethod = this.makeApiCall.bind(this, this.childBlocks.buttonRemoveUser, {
            popupSelector: removeUserSelector,
            apiMethod: removeUsersFromChatApi,
            beforeApiMethodCall: () => {
                this.childBlocks.buttonRemoveUser.setProps({isDisabled: true});
            },
            afterApiMethodCall: () => {
                this.childBlocks.buttonRemoveUser.setProps({isDisabled: false});
            },
            callbackWithResponse: (responseData: PlainObject) => {
                if(!responseData.errorMsg) {
                    this.togglePopup(false, removeUserSelector);
                    const { text: usersCount } = (this.childBlocks.chatUsersCountLabel as Title).props;
                    this.childBlocks.chatUsersCountLabel.setProps({text: parseInt(usersCount) - 1});
                } else {
                    console.log(responseData.errorMsg);
                }
            }
        });

        // Получаем авторизованного юзера
        getUserApi().then((data: PlainObject) => {
            if(!data.errorMsg) {
                this.getChatsFromServer();
            }
        });
    }

    makeApiCall(buttonBlock: Block<ButtonProps>, apiCallData: ApiCallData, formInputs: FormInputs) {
        const {data} = formInputs;
        const {apiMethod, beforeApiMethodCall, afterApiMethodCall, callbackWithResponse} = apiCallData;
        beforeApiMethodCall();
        apiMethod.call(this, {formInputs: data, chatId: this.props.selectedChatItemId}).then((response: PlainObject) => {
            afterApiMethodCall();
            if(!data.errorMsg) {
                callbackWithResponse(response);
            } else {
                throw new Error(response.errorMsg as string);
            }
        }).catch(err => {
            afterApiMethodCall();
            handleError(err);
        });
    }

    getChatsFromServer() {
        getChatsApi().then((chatItems: unknown) => {
                if ((chatItems as PlainObject[])?.length) {
                    const chats: PlainObject = {};
                    for (let {id, title} of (chatItems as [])) {
                        getNewMessagesCount({chatId: parseInt(id)}).then((data: PlainObject) => {
                            let unreadCount = (data as NewMessagesCountResponse)?.unread_count || 0;
                            if (unreadCount && this.props?.chats[id]) {
                                Object.assign(this.props.chats[id], {unreadCount});
                                this.setProps({chats: this.props.chats})
                            }
                        });
                        chats[id] = {title};
                    }
                    this.setProps({chats});
                }

        });
    }

    addChatItemHandlers() {
        const chatItemLinks = this.getContent().querySelectorAll('.chat-item > a');
        chatItemLinks.forEach((item: HTMLElement) => {
            this.addListener(item, 'click', handleSelectChatItem.bind(this), 'a');
        });
    }

    setProps(nextProps: object) {
        super.setProps(nextProps)
        this.addChatItemHandlers();
    }

    public show() {
        // Получаем авторизованного юзера
        getUserApi().then((data: PlainObject) => {
            console.log(data)
            // Получаем чаты
            this.getChatsFromServer();
            super.show();
        });
    }

    render(): string {
        return compileTemplate<ChatProps>(template, {
            props: {...this.props, mockData: mockChatData},
            slots: {...this.slots}
        });
    }
}

function handleSelectChatItem(evt: Event) {
    const chatId = (evt.currentTarget as HTMLElement).dataset.chatItemId;
    this.setProps({selectedChatItemId: chatId});
    getChatUsersApi({chatId}).then((data: PlainObject) => {
        if(!data.errorMsg) {
            if(Array.isArray(data)) {
                this.childBlocks.chatUsersCountLabel.setProps({ text: data.length });
            }
        }
    });
}


const defaultChildren = {
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

    // linkShowAddChatPopup, linkCloseAddChatPopup, linkShowRemoveChatPopup, linkCloseRemoveChatPopup,
    // linkShowAddUserPopup, linkCloseAddUserPopup, linkShowRemoveUserPopup, linkCloseRemoveUserPopup
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
            // TODO: поменять когда будет готов компонент Image
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