import { compileTemplate } from '../../core/Template/index';
import template from './template';
import { Block, Children, Props } from '../../core/Block/index';
import { Input } from '../../components/Input/index';
import { Title } from '../../components/Title/index';
import { Button, ButtonProps } from '../../components/Button/index';
import { Link } from '../../components/Link/index';
import { getUserApi, handleError, loginApi } from '../../utils/api';
import { Router } from '../../core/Router/index';
import { PlainObject } from '../../utils/utils';
import { FormInputs } from '../../utils/validation';

export interface LoginProps extends Props{
}

export class Login extends Block<LoginProps> {

    constructor(parentElement: HTMLElement, props: LoginProps, children: Children = defaultChildren, tagName?: string) {
        super(parentElement, props, children, tagName);

        (children.button.blockProps as ButtonProps).handleMethod = this.loginUser.bind(this);
        getUserApi().then((data: PlainObject) => {
            if(!data.errorMsg) {
                Router.getInstance().go('/chat');
            }
        }).catch(err => {
            handleError({errorMsg: err.message});
        });
    }

    loginUser(inputs: FormInputs) {
        const {data} = inputs;
        this.childBlocks.button.setProps({isDisabled: true});
        loginApi(data).then((data: PlainObject) => {
            this.childBlocks.button.setProps({isDisabled: false});
            if(!data.errorMsg) {
                Router.getInstance().go('/chat');
            } else {
                throw new Error(data.errorMsg as string);
            }
        }).catch(err => {
            this.childBlocks.button.setProps({isDisabled: false});
            handleError({errorMsg: err.message}, this.childBlocks.login.childBlocks.error);
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