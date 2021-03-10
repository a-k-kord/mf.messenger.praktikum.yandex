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
import { compileTemplate } from '../../core/Template/index';
import template from './template';
import { Block } from '../../core/Block/index';
import { Link } from '../../components/Link/index';
import { Input } from '../../components/Input/index';
import { Title } from '../../components/Title/index';
import { Button } from '../../components/Button/index';
import { getUserApi, handleError, logoutApi, saveAvatarApi, savePasswordApi, saveProfileApi, serverHost } from '../../utils/api';
import { Router } from '../../core/Router/index';
import { Image } from '../../components/Image/index';
import { hide } from '../../utils/dom';
var Profile = (function (_super) {
    __extends(Profile, _super);
    function Profile(parentElement, props, children, tagName) {
        if (children === void 0) { children = defaultChildren; }
        var _this = _super.call(this, parentElement, props, children, tagName) || this;
        children.linkLogout.blockProps.handleMethod = _this.logoutUser.bind(_this);
        children.linkProfileEdit.blockProps.handleMethod = _this.toggleProfileEditableForm.bind(_this, true);
        children.linkCancelSave.blockProps.handleMethod = _this.toggleProfileEditableForm.bind(_this, false);
        children.buttonSave.blockProps.handleMethod = _this.saveProfile.bind(_this);
        children.linkChangePassword.blockProps.handleMethod = _this.togglePasswordEditableForm.bind(_this, true);
        children.linkCancelSavePassword.blockProps.handleMethod = _this.togglePasswordEditableForm.bind(_this, false);
        children.buttonSavePassword.blockProps.handleMethod = _this.saveNewPassword.bind(_this);
        var popupCssSelector = '#change-avatar-popup';
        children.linkAvatarUpload.blockProps.handleMethod = _this.togglePopup.bind(_this, true, popupCssSelector);
        children.linkCloseChangeAvatarPopup.blockProps.handleMethod = _this.togglePopup.bind(_this, false, popupCssSelector);
        children.buttonChangeAvatar.blockProps.handleMethod = _this.saveAvatar.bind(_this);
        getUserApi().then(function (data) {
            if (!data.errorMsg) {
                _this.mutateProfileDataControls(data);
            }
        }).catch(function (err) {
            handleError({ errorMsg: err.message });
        });
        return _this;
    }
    Profile.prototype.mutateProfileDataControls = function (data) {
        var email = data.email, login = data.login, first_name = data.first_name, second_name = data.second_name, display_name = data.display_name, phone = data.phone, avatar = data.avatar;
        (display_name || first_name || second_name) && this.childBlocks.userNameLabel.setProps({ text: display_name || first_name + " " + second_name });
        first_name && this.childBlocks.firstName.setProps({ text: first_name });
        second_name && this.childBlocks.secondName.setProps({ text: second_name });
        display_name && this.childBlocks.displayName.setProps({ text: display_name });
        email && this.childBlocks.email.setProps({ text: email });
        login && this.childBlocks.login.setProps({ text: login });
        phone && this.childBlocks.phone.setProps({ text: phone });
        avatar && this.childBlocks.avatar.setProps({ src: "" + serverHost + avatar });
    };
    Profile.prototype.logoutUser = function () {
        logoutApi().then(function (data) {
            if (!data.errorMsg) {
                Router.getInstance().go("/login");
            }
            else {
                throw new Error(data.errorMsg);
            }
        }).catch(function (err) {
            handleError({ errorMsg: err.message });
        });
    };
    Profile.prototype.hideErrors = function (form) {
        var errors = form.querySelectorAll('[data-block-name="error"]');
        errors.forEach(function (error) {
            hide(error);
        });
    };
    Profile.prototype.toggleProfileEditableForm = function (isEditable) {
        this.hideErrors(this.childBlocks.login.getContent().closest('form'));
        [this.childBlocks.userNameLabel, this.childBlocks.firstName, this.childBlocks.secondName,
            this.childBlocks.displayName, this.childBlocks.email, this.childBlocks.login, this.childBlocks.phone].map(function (block) {
            block.setProps({ isReadonly: !isEditable });
        });
        [this.childBlocks.linkProfileEdit, this.childBlocks.linkChangePassword, this.childBlocks.linkLogout].map(function (block) {
            block.setProps({ isHidden: isEditable });
        });
        this.childBlocks.buttonSave.setProps({ isHidden: !isEditable });
        this.childBlocks.linkCancelSave.setProps({ isHidden: !isEditable });
    };
    Profile.prototype.togglePasswordEditableForm = function (isEditable) {
        this.hideErrors(this.childBlocks.login.getContent().closest('form'));
        [this.childBlocks.firstName, this.childBlocks.secondName,
            this.childBlocks.displayName, this.childBlocks.email, this.childBlocks.login, this.childBlocks.phone].map(function (block) {
            block.setProps({ isHidden: isEditable });
        });
        [this.childBlocks.oldPassword, this.childBlocks.password, this.childBlocks.passwordConfirm].map(function (block) {
            block.setProps({ isHidden: !isEditable });
        });
        [this.childBlocks.linkProfileEdit, this.childBlocks.linkChangePassword, this.childBlocks.linkLogout].map(function (block) {
            block.setProps({ isHidden: isEditable });
        });
        this.childBlocks.buttonSavePassword.setProps({ isHidden: !isEditable });
        this.childBlocks.linkCancelSavePassword.setProps({ isHidden: !isEditable });
    };
    Profile.prototype.saveNewPassword = function (inputs) {
        var _this = this;
        var _a = inputs.data, oldPassword = _a.oldPassword, password = _a.password;
        this.childBlocks.buttonSavePassword.setProps({ isDisabled: true });
        savePasswordApi({ oldPassword: oldPassword, newPassword: password })
            .then(function (data) {
            _this.childBlocks.buttonSavePassword.setProps({ isDisabled: false });
            if (!data.errorMsg) {
                _this.togglePasswordEditableForm(false);
            }
            else {
                throw new Error(data.errorMsg);
            }
        })
            .catch(function (err) {
            _this.childBlocks.buttonSavePassword.setProps({ isDisabled: false });
            handleError({ errorMsg: err.message });
        });
    };
    Profile.prototype.saveAvatar = function (inputs) {
        var _this = this;
        var form = inputs.form;
        this.childBlocks.buttonChangeAvatar.setProps({ isDisabled: true });
        saveAvatarApi(new FormData(form)).then(function (data) {
            _this.childBlocks.buttonChangeAvatar.setProps({ isDisabled: false });
            if (!data.errorMsg) {
                getUserApi().then(function (_a) {
                    var avatar = _a.avatar;
                    avatar && _this.childBlocks.avatar.setProps({ src: "" + serverHost + avatar });
                }).catch(function (err) {
                    handleError({ errorMsg: err.message });
                });
                Router.getInstance().go('/profile');
            }
            else {
                throw new Error(data.errorMsg);
            }
        }).catch(function (err) {
            _this.childBlocks.buttonChangeAvatar.setProps({ isDisabled: false });
            handleError({ errorMsg: err.message });
        });
    };
    Profile.prototype.saveProfile = function (inputs) {
        var _this = this;
        var _a = inputs.data, login = _a.login, email = _a.email, first_name = _a.first_name, second_name = _a.second_name, display_name = _a.display_name, phone = _a.phone;
        this.childBlocks.buttonSave.setProps({ isDisabled: true });
        saveProfileApi({ login: login, email: email, first_name: first_name, second_name: second_name, display_name: display_name, phone: phone }).then(function (data) {
            _this.childBlocks.buttonSave.setProps({ isDisabled: false });
            if (!data.errorMsg) {
                _this.mutateProfileDataControls({ email: email, login: login, first_name: first_name, second_name: second_name, display_name: display_name, phone: phone });
                _this.toggleProfileEditableForm(false);
            }
            else {
                throw new Error(data.errorMsg);
            }
        }).catch(function (err) {
            _this.childBlocks.buttonSave.setProps({ isDisabled: false });
            handleError({ errorMsg: err.message });
        });
    };
    Profile.prototype.show = function () {
        var _this = this;
        getUserApi().then(function (data) {
            if (!data.errorMsg) {
                _this.mutateProfileDataControls(data);
            }
            else {
            }
        }).then(function () {
            _super.prototype.show.call(_this);
        }).catch(function (err) {
            handleError({ errorMsg: err.message });
        });
    };
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
};
