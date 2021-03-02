import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block, Children, Props } from '../../core/Block/index.js';
import { Input } from "../../components/Input/index.js";
import { Title } from "../../components/Title/index.js";
import { Button, ButtonProps } from "../../components/Button/index.js";
import { Link } from "../../components/Link/index.js";
import { getUserApi, handleError, loginApi } from "../../utils/api.js";
import { Router } from "../../core/Router/index.js";
import { PlainObject } from "../../utils/utils.js";
import { FormInputs } from "../../utils/validation.js";

export interface LoginProps extends Props{
}

export class Login extends Block<LoginProps> {

    constructor(parentElement: HTMLElement, props: LoginProps, children: Children = defaultChildren, tagName?: string) {
        super(parentElement, props, children, tagName);

        (children.button.blockProps as ButtonProps).handleMethod = this.loginUser.bind(this);
        getUserApi().then((data: PlainObject) => {
            if(!data.errorMsg) {
                Router.__instance.go('/chat');
            }
        });
    }

    loginUser(inputs: FormInputs) {
        const {data} = inputs;
        this.childBlocks.button.setProps({isDisabled: true});
        loginApi(data).then((data: PlainObject) => {
            this.childBlocks.button.setProps({isDisabled: false});
            if(!data.errorMsg) {
                Router.__instance.go('/chat');
            } else {
                throw new Error(data.errorMsg as string);
            }
        }).catch(err => {
            this.childBlocks.button.setProps({isDisabled: false});
            handleError(err, this.childBlocks.login.childBlocks.error);
        });
    }

    render(): string {
        return compileTemplate<LoginProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }
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
            validationType: 'limitedString',
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
            validationType: 'limitedString',
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
            isDisabled: false,
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
            type: 'routeLink',
            linkTo: 'register',
            text: 'Нет аккаунта?',
            size: 'small',
            theme: 'primary',
            wrapperStyles: 'form__link',
        }
    }
};