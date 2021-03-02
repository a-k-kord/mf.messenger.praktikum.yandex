import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block, Children } from '../../core/Block/index.js';
import { Input } from "../../components/Input/index.js";
import { Title } from "../../components/Title/index.js";
import { Button } from "../../components/Button/index.js";
import { Link } from "../../components/Link/index.js";

export interface LoginProps{
}

const defaultChildren = {
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
    password: {
        blockConstructor: Input,
        blockProps: {
            id: 'password',
            name: 'password',
            type: 'password',
            placeholder: 'Пароль',
            hasText: true,
            size: 'small',
            stylesAfter: 'form__input box box--underlined-primary',
            wrapperStyles: 'form__item form__item--big',
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Пароль',
                    size: 'tiny',
                    theme: 'label',
                    stylesAfter: 'form__label form__label--with-anim-up',
                    attrs: 'for="password"',
                }
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Неверный пароль',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg',
                    isHidden: true,
                }
            }
        }
    },
    button: {
        blockConstructor: Button,
        blockProps: {
            text: 'Авторизоваться',
            type: 'submit',
            formMethod: 'POST',
            hasText: true,
            size: 'small',
            theme: 'light',
            weight: 'bold',
            stylesAfter: 'form__input box box--underlined-primary',
            wrapperStyles: 'form__button',
        }
    },
    link: {
        blockConstructor: Link,
        blockProps: {
            linkTo: 'register.html',
            text: 'Нет аккаунта?',
            size: 'small',
            theme: 'primary',
            wrapperStyles: 'form__link',
        }
    }
};

export class Login extends Block<LoginProps> {

    constructor(parentElement: HTMLElement, props: LoginProps, children: Children = defaultChildren, tagName?: string) {
        super(parentElement, props, children, tagName);
    }

    render(): string {
        return compileTemplate<LoginProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }
}