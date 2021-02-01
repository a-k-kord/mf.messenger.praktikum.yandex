import { Profile } from "./Profile.js";
import { Input } from "../../components/Input/index.js";
import { Title } from "../../components/Title/index.js";
import { Link } from "../../components/Link/index.js";
import { Button } from "../../components/Button/index.js";

const root: HTMLElement = document.querySelector('#app');

const profile = new Profile(root, {}, {
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
                    stylesAfter: 'form__error-msg',
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
                    stylesAfter: 'form__error-msg',
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
                    stylesAfter: 'form__error-msg',
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
                    stylesAfter: 'form__error-msg',
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
                    stylesAfter: 'form__error-msg',
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
                    stylesAfter: 'form__error-msg',
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
                    stylesAfter: 'form__error-msg',
                }
            }
        }
    },
    newPassword: {
        blockConstructor: Input,
        blockProps: {
            id: 'newPassword',
            name: 'newPassword',
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
                    attrs: 'for="newPassword"'
                }
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: '',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg',
                }
            }
        }
    },
    newPasswordConfirm: {
        blockConstructor: Input,
        blockProps: {
            id: 'newPasswordConfirm',
            name: 'newPasswordConfirm',
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
                    attrs: 'for="newPasswordConfirm"'
                }
            },
            error: {
                blockConstructor: Title,
                blockProps: {
                    text: '',
                    size: 'small',
                    theme: 'danger',
                    stylesAfter: 'form__error-msg',
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
});

// profile.childBlocks.buttonSave.setProps({
//     text: 'Бывает, что ж поделать... ',
// })
// <button
//     class="text text--theme--light text--size--small text--weight--bold button button__text"  type="submit"  formmethod="POST">Поменять</button>