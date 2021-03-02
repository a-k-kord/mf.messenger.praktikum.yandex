var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from '../../core/Block/index.js';
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
var Register = (function (_super) {
    __extends(Register, _super);
    function Register(parentElement, props, children, tagName) {
        if (children === void 0) { children = defaultChildren; }
        return _super.call(this, parentElement, props, children, tagName) || this;
    }
    Register.prototype.render = function () {
        return compileTemplate(template, {
            props: __assign({}, this.props),
            slots: __assign({}, this.slots)
        });
    };
    return Register;
}(Block));
export { Register };
var defaultChildren = {
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
                    attrs: 'for="email"'
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
                    attrs: 'for="login"'
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
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Имя',
                    size: 'tiny',
                    theme: 'label',
                    stylesAfter: 'form__label form__label--with-anim-up',
                    attrs: 'for="first_name"'
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
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Фамилия',
                    size: 'tiny',
                    theme: 'label',
                    stylesAfter: 'form__label form__label--with-anim-up',
                    attrs: 'for="second_name"'
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
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Телефон',
                    size: 'tiny',
                    theme: 'label',
                    stylesAfter: 'form__label form__label--with-anim-up',
                    attrs: 'for="phone"'
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
    password: {
        blockConstructor: Input,
        blockProps: {
            id: 'password',
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
                    attrs: 'for="password"'
                }
            }
        }
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
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Пароль',
                    size: 'tiny',
                    theme: 'label',
                    stylesAfter: 'form__label form__label--with-anim-up',
                    attrs: 'for="password_confirm"'
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
            text: 'Зарегистрироваться',
            type: 'submit',
            formMethod: 'POST',
            hasText: true,
            size: 'small',
            theme: 'light',
            weight: 'bold',
            wrapperStyles: 'form__button',
        }
    },
    link: {
        blockConstructor: Link,
        blockProps: {
            linkTo: 'login.html',
            text: 'Войти',
            size: 'small',
            theme: 'primary',
            wrapperStyles: 'form__link',
        }
    }
};
