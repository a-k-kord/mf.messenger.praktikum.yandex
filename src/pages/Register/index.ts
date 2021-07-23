import { compileTemplate } from '../../core/Template/index';
import template from './template';
import { Block, Children, Props } from '../../core/Block/index';
import { Input } from '../../components/Input/index';
import { Title } from '../../components/Title/index';
import { Button, ButtonProps } from '../../components/Button/index';
import { Link } from '../../components/Link/index';
import { getUserApi, handleError, registerApi } from '../../utils/api';
import { Router } from '../../core/Router/index';
import { PlainObject } from '../../utils/utils';
import { FormInputs } from '../../utils/validation';
import { Chat } from '../Chat/index';

export interface RegisterProps extends Props {
}

export class Register extends Block<RegisterProps> {
    static pathname = '/register';

    constructor(
        parentElement: HTMLElement,
        props: RegisterProps,
        children: Children = defaultChildren,
        tagName?: string,
    ) {
        super(parentElement, props, children, tagName);

        (children.button.blockProps as ButtonProps).handleMethod = this.registerUser.bind(this);
        getUserApi().then((data: PlainObject) => {
            if (!data.errorMsg) {
                Router.getInstance().go(Chat.pathname);
            }
        }).catch((err) => {
            handleError({ errorMsg: err.message });
        });
    }

    registerUser(inputs: FormInputs) {
        const { data } = inputs;
        this.childBlocks.button.setProps({ isDisabled: true });
        registerApi(data).then((dataObj: PlainObject) => {
            this.childBlocks.button.setProps({ isDisabled: false });
            if (!dataObj.errorMsg) {
                Router.getInstance().go(Chat.pathname);
            } else {
                throw new Error(dataObj.errorMsg as string);
            }
        }).catch((err) => {
            this.childBlocks.button.setProps({ isDisabled: false });
            handleError({ errorMsg: err.message }, this.childBlocks.email.childBlocks.error);
        });
    }

    render(): string {
        return compileTemplate<RegisterProps>(template, {
            props: { ...this.props },
            slots: { ...this.slots },
        });
    }
}

const defaultChildren = {
    email: {
        blockConstructor: Input,
        blockProps: {
            id: 'email',
            name: 'email',
            placeholder: 'Почта',
            hasText: true,
            size: 'small',
            stylesAfter: 'form__input box box--underlined-primary',
            wrapperStyles: 'form__item form__item--big',
            validationType: 'email',
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Почта',
                    size: 'tiny',
                    theme: 'label',
                    stylesAfter: 'form__label form__label--with-anim-up',
                    attrs: 'for="email"',
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
    firstName: {
        blockConstructor: Input,
        blockProps: {
            id: 'first_name',
            name: 'first_name',
            placeholder: 'Имя',
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
                    text: 'Имя',
                    size: 'tiny',
                    theme: 'label',
                    stylesAfter: 'form__label form__label--with-anim-up',
                    attrs: 'for="first_name"',
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
    secondName: {
        blockConstructor: Input,
        blockProps: {
            id: 'second_name',
            name: 'second_name',
            placeholder: 'Фамилия',
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
                    text: 'Фамилия',
                    size: 'tiny',
                    theme: 'label',
                    stylesAfter: 'form__label form__label--with-anim-up',
                    attrs: 'for="second_name"',
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
    phone: {
        blockConstructor: Input,
        blockProps: {
            id: 'phone',
            name: 'phone',
            placeholder: 'Телефон',
            hasText: true,
            size: 'small',
            stylesAfter: 'form__input box box--underlined-primary',
            wrapperStyles: 'form__item form__item--big',
            validationType: 'phone',
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Телефон',
                    size: 'tiny',
                    theme: 'label',
                    stylesAfter: 'form__label form__label--with-anim-up',
                    attrs: 'for="phone"',
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
    passwordConfirm: {
        blockConstructor: Input,
        blockProps: {
            id: 'password_confirm',
            name: 'password_confirm',
            type: 'password',
            placeholder: 'Пароль (ещё раз)',
            hasText: true,
            size: 'small',
            stylesAfter: 'form__input box box--underlined-primary',
            wrapperStyles: 'form__item form__item--big',
            validationType: 'passwordConfirm',
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Пароль',
                    size: 'tiny',
                    theme: 'label',
                    stylesAfter: 'form__label form__label--with-anim-up',
                    attrs: 'for="password_confirm"',
                },
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Неверный пароль',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg',
                    isHidden: true,
                },
            },
        },
    },
    button: {
        blockConstructor: Button,
        blockProps: {
            text: 'Зарегистрироваться',
            type: 'submit',
            formMethod: 'POST',
            isDisabled: false,
            hasText: true,
            size: 'small',
            theme: 'light',
            weight: 'bold',
            wrapperStyles: 'form__button',
        },
    },
    link: {
        blockConstructor: Link,
        blockProps: {
            type: 'routeLink',
            linkTo: 'login',
            text: 'Войти',
            size: 'small',
            theme: 'primary',
            wrapperStyles: 'form__link',
        },
    },
};
