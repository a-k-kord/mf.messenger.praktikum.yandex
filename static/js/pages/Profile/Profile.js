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
import { Link } from "../../components/Link";
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
var Profile = (function (_super) {
    __extends(Profile, _super);
    function Profile(parentElement, props, children, tagName) {
        if (children === void 0) { children = defaultChildren; }
        return _super.call(this, parentElement, props, children, tagName) || this;
    }
    Profile.prototype.render = function () {
        return compileTemplate(template, {
            props: __assign({}, this.props),
            slots: __assign({}, this.slots)
        });
    };
    return Profile;
}(Block));
export { Profile };
var defaultChildren = {
    linkBack: {
        blockConstructor: Link,
        blockProps: {
            linkTo: 'chat.html',
            image: '<img class="link__image box box--center" src="img/arrow-back-btn.svg" alt="Go back">'
        }
    },
    linkAvatarUpload: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#change-avatar-popup',
            text: 'Поменять аватар',
            size: 'small',
            theme: 'light',
            stylesAfter: 'box box--center avatar__upload'
        }
    },
    email: {
        blockConstructor: Input,
        blockProps: {
            id: 'email',
            name: 'email',
            placeholder: 'Почта',
            hasText: true,
            size: 'small',
            align: 'right',
            theme: 'label',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            isReadonly: true,
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Почта',
                    size: 'small',
                    stylesAfter: 'form__label',
                    tagName: 'label',
                    attrs: 'for="email"'
                }
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: '',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg box box--none',
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
            align: 'right',
            theme: 'label',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            isReadonly: true,
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Логин',
                    size: 'small',
                    stylesAfter: 'form__label',
                    tagName: 'label',
                    attrs: 'for="login"'
                }
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Неверный логин',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg box box--none',
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
            align: 'right',
            theme: 'label',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            isReadonly: true,
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Имя',
                    size: 'small',
                    stylesAfter: 'form__label',
                    tagName: 'label',
                    attrs: 'for="first_name"'
                }
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: '',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg box box--none',
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
            align: 'right',
            theme: 'label',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            isReadonly: true,
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Фамилия',
                    size: 'small',
                    stylesAfter: 'form__label',
                    tagName: 'label',
                    attrs: 'for="second_name"'
                }
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: '',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg box box--none',
                }
            }
        }
    },
    displayName: {
        blockConstructor: Input,
        blockProps: {
            id: 'display_name',
            name: 'display_name',
            placeholder: 'Имя в чате',
            hasText: true,
            size: 'small',
            align: 'right',
            theme: 'label',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            isReadonly: true,
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Имя в чате',
                    size: 'small',
                    stylesAfter: 'form__label',
                    tagName: 'label',
                    attrs: 'for="display_name"'
                }
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: '',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg box box--none',
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
            align: 'right',
            theme: 'label',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            isReadonly: true,
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Телефон',
                    size: 'small',
                    stylesAfter: 'form__label',
                    tagName: 'label',
                    attrs: 'for="phone"'
                }
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: '',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg box box--none',
                }
            }
        }
    },
    oldPassword: {
        blockConstructor: Input,
        blockProps: {
            id: 'oldPassword',
            name: 'oldPassword',
            type: 'password',
            placeholder: 'Старый пароль',
            hasText: true,
            size: 'small',
            align: 'right',
            theme: 'label',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            isHidden: true,
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Старый пароль',
                    size: 'small',
                    stylesAfter: 'form__label box--width--250',
                    attrs: 'for="oldPassword"'
                }
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: '',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg box box--none',
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
            placeholder: 'Новый пароль',
            hasText: true,
            size: 'small',
            align: 'right',
            theme: 'label',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            isHidden: true,
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Новый пароль',
                    size: 'small',
                    stylesAfter: 'form__label box--width--250',
                    attrs: 'for="password"'
                }
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: '',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg box box--none',
                }
            }
        }
    },
    passwordConfirm: {
        blockConstructor: Input,
        blockProps: {
            id: 'passwordConfirm',
            name: 'passwordConfirm',
            type: 'password',
            placeholder: 'Повторите новый пароль',
            hasText: true,
            size: 'small',
            align: 'right',
            theme: 'label',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            isHidden: true,
        },
        children: {
            label: {
                blockConstructor: Title,
                blockProps: {
                    text: 'Повторите новый пароль',
                    size: 'small',
                    stylesAfter: 'form__label box--width--250',
                    attrs: 'for="passwordConfirm"'
                }
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: '',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg box box--none',
                }
            }
        }
    },
    linkProfileEdit: {
        blockConstructor: Link,
        blockProps: {
            linkTo: 'profile-edit.html',
            text: 'Изменить данные',
            hasText: true,
            align: 'left',
            size: 'small',
            theme: 'primary',
            wrapperStyles: 'form__item box box--underlined',
        }
    },
    linkChangePassword: {
        blockConstructor: Link,
        blockProps: {
            linkTo: 'profile-password.html',
            text: 'Изменить пароль',
            hasText: true,
            align: 'left',
            size: 'small',
            theme: 'primary',
            wrapperStyles: 'form__item box box--underlined',
        }
    },
    linkLogout: {
        blockConstructor: Link,
        blockProps: {
            linkTo: 'login.html',
            text: 'Выйти',
            hasText: true,
            align: 'left',
            size: 'small',
            theme: 'danger',
            wrapperStyles: 'form__item',
        }
    },
    buttonSave: {
        blockConstructor: Button,
        blockProps: {
            text: 'Сохранить',
            type: 'submit',
            formMethod: 'POST',
            hasText: true,
            size: 'small',
            theme: 'light',
            weight: 'bold',
            stylesAfter: 'form__input box box--underlined-primary',
            isHidden: true
        }
    },
    buttonSavePassword: {
        blockConstructor: Button,
        blockProps: {
            text: 'Поменять',
            type: 'submit',
            formMethod: 'POST',
            hasText: true,
            size: 'small',
            theme: 'light',
            weight: 'bold',
            stylesAfter: 'form__input box box--underlined-primary',
            isHidden: true
        }
    },
};
