import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block, Children, Props } from '../../core/Block/index.js';
import { Link, LinkProps } from "../../components/Link/index.js";
import { Input } from "../../components/Input/index.js";
import { Title } from "../../components/Title/index.js";
import { Button, ButtonProps } from "../../components/Button/index.js";
import {
    getUserApi,
    handleError,
    logoutApi,
    saveAvatarApi,
    savePasswordApi,
    saveProfileApi,
    serverHost
} from "../../utils/api.js";
import { Router } from "../../core/Router/index.js";
import { PlainObject } from "../../utils/utils.js";
import { Image } from "../../components/Image/index.js";
import { hide } from "../../utils/dom.js";
import { FormInputs } from "../../utils/validation.js";

export interface ProfileProps extends Props {
}

export class Profile extends Block<ProfileProps> {

    constructor(parentElement: HTMLElement, props: ProfileProps, children: Children = defaultChildren, tagName?: string) {
        super(parentElement, props, children, tagName);
        (children.linkLogout.blockProps as LinkProps).handleMethod = this.logoutUser.bind(this);

        (children.linkProfileEdit.blockProps as LinkProps).handleMethod = this.toggleProfileEditableForm.bind(this, true);
        (children.linkCancelSave.blockProps as LinkProps).handleMethod = this.toggleProfileEditableForm.bind(this, false);
        (children.buttonSave.blockProps as ButtonProps).handleMethod = this.saveProfile.bind(this);

        (children.linkChangePassword.blockProps as LinkProps).handleMethod = this.togglePasswordEditableForm.bind(this, true);
        (children.linkCancelSavePassword.blockProps as LinkProps).handleMethod = this.togglePasswordEditableForm.bind(this, false);
        (children.buttonSavePassword.blockProps as ButtonProps).handleMethod = this.saveNewPassword.bind(this);

        const popupCssSelector = '#change-avatar-popup';
        (children.linkAvatarUpload.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, true, popupCssSelector);
        (children.linkCloseChangeAvatarPopup.blockProps as LinkProps).handleMethod = this.togglePopup.bind(this, false, popupCssSelector);
        (children.buttonChangeAvatar.blockProps as ButtonProps).handleMethod = this.saveAvatar.bind(this);

        getUserApi().then((data: PlainObject) => {
            if (!data.errorMsg) {
                this.mutateProfileDataControls(data);
            }
        });
    }

    mutateProfileDataControls(data) {
        const {email, login, first_name, second_name, display_name, phone, avatar} = data;
        (display_name || first_name || second_name) && this.childBlocks.userNameLabel.setProps({text: display_name || `${first_name} ${second_name}`});
        first_name && this.childBlocks.firstName.setProps({text: first_name});
        second_name && this.childBlocks.secondName.setProps({text: second_name});
        display_name && this.childBlocks.displayName.setProps({text: display_name});
        email && this.childBlocks.email.setProps({text: email});
        login && this.childBlocks.login.setProps({text: login});
        phone && this.childBlocks.phone.setProps({text: phone});
        avatar && this.childBlocks.avatar.setProps({src: `${serverHost}${avatar}`});
    }

    logoutUser() {
        logoutApi().then((data: PlainObject) => {
            if(!data.errorMsg) {
                Router.__instance.go(`/login`);
            } else {
                throw new Error(data.errorMsg as string);
            }
        }).catch(err => {
            handleError({errorMsg: err.message});
        });
    }

    hideErrors(form: HTMLFormElement) {
        const errors = form.querySelectorAll('[data-block-name="error"]');
        errors.forEach((error: HTMLElement) => {
            hide(error);
        })
    }

    toggleProfileEditableForm(isEditable: boolean) {
        this.hideErrors(this.childBlocks.login.getContent().closest('form'));
        [this.childBlocks.userNameLabel, this.childBlocks.firstName, this.childBlocks.secondName,
            this.childBlocks.displayName, this.childBlocks.email, this.childBlocks.login, this.childBlocks.phone].map(block => {
            block.setProps({isReadonly: !isEditable});
        });
        [this.childBlocks.linkProfileEdit, this.childBlocks.linkChangePassword, this.childBlocks.linkLogout].map(block => {
            block.setProps({isHidden: isEditable});
        });
        this.childBlocks.buttonSave.setProps({isHidden: !isEditable});
        this.childBlocks.linkCancelSave.setProps({isHidden: !isEditable});
    }

    togglePasswordEditableForm(isEditable: boolean) {
        this.hideErrors(this.childBlocks.login.getContent().closest('form'));
        [this.childBlocks.firstName, this.childBlocks.secondName,
            this.childBlocks.displayName, this.childBlocks.email, this.childBlocks.login, this.childBlocks.phone].map(block => {
            block.setProps({isHidden: isEditable});
        });
        [this.childBlocks.oldPassword, this.childBlocks.password, this.childBlocks.passwordConfirm].map(block => {
            block.setProps({isHidden: !isEditable});
        });
        [this.childBlocks.linkProfileEdit, this.childBlocks.linkChangePassword, this.childBlocks.linkLogout].map(block => {
            block.setProps({isHidden: isEditable});
        });
        this.childBlocks.buttonSavePassword.setProps({isHidden: !isEditable});
        this.childBlocks.linkCancelSavePassword.setProps({isHidden: !isEditable});
    }

    saveNewPassword(inputs: FormInputs) {
        const {data: {oldPassword, password}} = inputs;
        this.childBlocks.buttonSavePassword.setProps({isDisabled: true});
        savePasswordApi({oldPassword, newPassword: password})
            .then((data: PlainObject) => {
                this.childBlocks.buttonSavePassword.setProps({isDisabled: false});
                if (!data.errorMsg) {
                    this.togglePasswordEditableForm(false);
                } else {
                    throw new Error(data.errorMsg as string);
                }
            })
            .catch(err => {
                this.childBlocks.buttonSavePassword.setProps({isDisabled: false});
                handleError({errorMsg: err.message});
            });
    }

    saveAvatar(inputs: FormInputs) {
        const {form} = inputs;
        this.childBlocks.buttonChangeAvatar.setProps({isDisabled: true});
        saveAvatarApi(new FormData(form)).then((data: PlainObject) => {
            this.childBlocks.buttonChangeAvatar.setProps({isDisabled: false});
            if(!data.errorMsg) {
                getUserApi().then(({avatar}) => {
                    avatar && this.childBlocks.avatar.setProps({src: `${serverHost}${avatar}`});
                });
                Router.__instance.go('/profile');
            } else {
                throw new Error(data.errorMsg as string);
            }
        }).catch(err => {
            this.childBlocks.buttonChangeAvatar.setProps({isDisabled: false});
            handleError({errorMsg: err.message});
        });
    }

    saveProfile(inputs: FormInputs) {
        const {data: {login, email, first_name, second_name, display_name, phone}} = inputs;
        this.childBlocks.buttonSave.setProps({isDisabled: true});
        saveProfileApi({login, email, first_name, second_name, display_name, phone}).then((data: PlainObject) => {
            this.childBlocks.buttonSave.setProps({isDisabled: false});
            if (!data.errorMsg) {
                this.mutateProfileDataControls({email, login, first_name, second_name, display_name, phone});
                this.toggleProfileEditableForm(false);
            } else {
                throw new Error(data.errorMsg as string);
            }
        }).catch(err => {
            this.childBlocks.buttonSave.setProps({isDisabled: false});
            handleError({errorMsg: err.message});
        });
    }

    public show() {
        // Получаем авторизованного юзера
        getUserApi().then((data: PlainObject) => {
            if (!data.errorMsg) {
                this.mutateProfileDataControls(data);
            } else {
                console.log(data.errorMsg);
            }
        }).then(() => {
            super.show();
        });
    }

    render(): string {
        return compileTemplate<ProfileProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }
}


const defaultChildren = {
    avatar: {
        blockConstructor: Image,
        blockProps: {
            src: 'img/avatar_placeholder.svg',
            alt: 'Avatar',
        }
    },
    avatarUpload: {
        blockConstructor: Input,
        blockProps: {
            id: 'avatar',
            name: 'avatar',
            text: '',
            type: 'file',
            accept: 'image/*',
            isHidden: true
        }
    },
    avatarUploadError: {
        blockConstructor: Title,
        blockProps: {
            text: 'Нужно выбрать файл',
            size: 'small',
            theme: 'danger',
            stylesAfter: 'form__error-msg--hidden',
        }
    },
    buttonChangeAvatar: {
        blockConstructor: Button,
        blockProps: {
            text: 'Поменять',
            type: 'submit',
            isDisabled: false,
            formMethod: 'POST',
            hasText: true,
            size: 'small',
            theme: 'light',
            weight: 'bold',
            stylesAfter: 'button button__text',
            wrapperStyles: 'form__button'
        }
    },
    userNameLabel: {
        blockConstructor: Title,
        blockProps: {
            text: '',
            align: 'center',
            weight: 'bold',
            stylesAfter: 'profile__title',
        }
    },
    linkBack: {
        blockConstructor: Link,
        blockProps: {
            type: 'routeLink',
            linkTo: 'chat',
            image: '<img class="link__image box box--center" src="img/arrow-back-btn.svg" alt="Go back">',
            stylesAfter: 'profile__nav-back-link'
        }
    },

    linkCloseChangeAvatarPopup: {
        blockConstructor: Link,
        blockProps: {
            linkTo: '#',
            hasText: false,
            stylesAfter: 'box box--all-viewport-space-fixed'
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
            text: '',
            placeholder: 'Почта',
            hasText: true,
            size: 'small',
            align: 'right',
            theme: 'grey',
            weight: 'bold',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            validationType: 'email',
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
                    isHidden: true,
                    stylesAfter: 'form__error-msg profile__error-msg',
                }
            },
        }
    },
    login: {
        blockConstructor: Input,
        blockProps: {
            id: 'login',
            name: 'login',
            text: '',
            placeholder: 'Логин',
            hasText: true,
            size: 'small',
            align: 'right',
            theme: 'grey',
            weight: 'bold',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            validationType: 'limitedString',
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
                    isHidden: true,
                    stylesAfter: 'form__error-msg profile__error-msg',
                }
            }
        }
    },
    firstName: {
        blockConstructor: Input,
        blockProps: {
            id: 'first_name',
            name: 'first_name',
            text: '',
            placeholder: 'Имя',
            hasText: true,
            size: 'small',
            align: 'right',
            theme: 'grey',
            weight: 'bold',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            validationType: 'limitedString',
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
                    isHidden: true,
                    stylesAfter: 'form__error-msg profile__error-msg',
                }
            }
        }
    },
    secondName: {
        blockConstructor: Input,
        blockProps: {
            id: 'second_name',
            name: 'second_name',
            text: '',
            placeholder: 'Фамилия',
            hasText: true,
            size: 'small',
            align: 'right',
            theme: 'grey',
            weight: 'bold',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            validationType: 'limitedString',
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
                    isHidden: true,
                    stylesAfter: 'form__error-msg profile__error-msg',
                }
            }
        }
    },
    displayName: {
        blockConstructor: Input,
        blockProps: {
            id: 'display_name',
            name: 'display_name',
            text: '',
            placeholder: 'Имя в чате',
            hasText: true,
            size: 'small',
            align: 'right',
            theme: 'grey',
            weight: 'bold',
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
                    isHidden: true,
                    stylesAfter: 'form__error-msg profile__error-msg',
                }
            }
        }
    },
    phone: {
        blockConstructor: Input,
        blockProps: {
            id: 'phone',
            name: 'phone',
            text: '',
            placeholder: 'Телефон',
            hasText: true,
            size: 'small',
            align: 'right',
            theme: 'grey',
            weight: 'bold',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            validationType: 'phone',
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
                    isHidden: true,
                    stylesAfter: 'form__error-msg profile__error-msg',
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
            theme: 'grey',
            weight: 'bold',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            validationType: 'limitedString',
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
                    isHidden: true,
                    stylesAfter: 'form__error-msg profile__error-msg',
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
            theme: 'grey',
            weight: 'bold',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            validationType: 'limitedString',
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
                    isHidden: true,
                    stylesAfter: 'form__error-msg profile__error-msg',
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
            theme: 'grey',
            weight: 'bold',
            stylesAfter: 'form__input',
            wrapperStyles: 'form__item form__item--inline box box--underlined',
            validationType: 'passwordConfirm',
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
                    isHidden: true,
                    stylesAfter: 'form__error-msg profile__error-msg',
                }
            }
        }
    },

    linkProfileEdit: {
        blockConstructor: Link,
        blockProps: {
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
            type: 'routeLink',
            linkTo: 'login',
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
            isDisabled: false,
            formMethod: 'POST',
            hasText: true,
            size: 'small',
            theme: 'light',
            weight: 'bold',
            stylesAfter: 'form__input box box--underlined-primary',
            wrapperStyles: 'box box--as--flex-center',
            isHidden: true
        }
    },
    linkCancelSave: {
        blockConstructor: Link,
        blockProps: {
            text: 'Отмена',
            hasText: true,
            align: 'left',
            size: 'small',
            theme: 'primary',
            wrapperStyles: 'form__link',
            isHidden: true,
        }
    },
    buttonSavePassword: {
        blockConstructor: Button,
        blockProps: {
            text: 'Поменять',
            type: 'submit',
            isDisabled: false,
            formMethod: 'POST',
            hasText: true,
            size: 'small',
            theme: 'light',
            weight: 'bold',
            stylesAfter: 'form__input box box--underlined-primary',
            wrapperStyles: 'box box--as--flex-center',
            isHidden: true
        }
    },
    linkCancelSavePassword: {
        blockConstructor: Link,
        blockProps: {
            text: 'Отмена',
            hasText: true,
            align: 'left',
            size: 'small',
            theme: 'primary',
            wrapperStyles: 'form__link',
            isHidden: true,
        }
    },
}