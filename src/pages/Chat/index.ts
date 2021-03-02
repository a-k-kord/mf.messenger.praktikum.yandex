import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { mockChatData } from '../../mockData/Chat.js';
import { Block, Children } from '../../core/Block/index.js';
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";

export interface ChatProps {
}

export class Chat extends Block<ChatProps> {

    constructor(parentElement: HTMLElement, props: ChatProps, children: Children = defaultChildren, tagName?: string) {
        super(parentElement, props, children, tagName);
    }
    
    render(): string {
        return compileTemplate<ChatProps>(template, {
            props: {...this.props, mockData: mockChatData},
            slots: {...this.slots}
        });
    }
}

const defaultChildren = {
    buttonAdd: {
        blockConstructor: Button,
        blockProps: {
            type: 'submit',
            formMethod: 'POST',
            hasText: true,
            text: 'Добавить',
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
            formMethod: 'POST',
            hasText: true,
            text: 'Удалить',
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
            formMethod: 'POST',
            hasText: true,
            text: 'Удалить',
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
            formMethod: 'POST',
            hasText: false,
            stylesAfter: 'send icon-arrow-right',
            // TODO: поменять когда будет готов компонент Image
            image: '<img src="img/arrow-back-btn.svg" alt="Send message" class="dropdown__icon">'
        }
    },

    login: {
        blockConstructor: Input,
        blockProps: {
            id: 'login',
            name: 'login',
            placeholder: 'Логин',
            hasText: true,
            size: 'small',
            stylesAfter: 'form__input box box--underlined-primary',
            wrapperStyles: 'form__item form__item--big',
            validationType: 'login',
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Логин',
                    size: 'tiny',
                    theme: 'label',
                    stylesAfter: 'form__label form__label--with-anim-up',
                    attrs: 'for="login"',
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