export function validateLimitedString(event, minLength, maxLength) {
    if (minLength === void 0) { minLength = 3; }
    if (maxLength === void 0) { maxLength = 100; }
    var input = event.target;
    if (!input.value.length) {
        this.childBlocks.error.setProps({ text: 'Необходимо заполнить', isHidden: false });
    }
    else {
        if (input.value.length < minLength) {
            this.childBlocks.error.setProps({ text: 'Слишком короткое поле', isHidden: false });
        }
        else if (input.value.length > maxLength) {
            this.childBlocks.error.setProps({ text: 'Слишком длинное поле', isHidden: false });
        }
        else {
            this.childBlocks.error.setProps({ text: '', isHidden: true });
        }
    }
}
export function validatePasswordConfirm(event, minLength, maxLength) {
    if (minLength === void 0) { minLength = 3; }
    if (maxLength === void 0) { maxLength = 100; }
    var input = event.target;
    if (!input.value.length) {
        this.childBlocks.error.setProps({ text: 'Необходимо заполнить', isHidden: false });
    }
    else {
        var originalPassword = document.querySelector('input[name="password"]');
        if (input.value !== originalPassword.value) {
            this.childBlocks.error.setProps({ text: 'Пароли не совпадают', isHidden: false });
        }
        else {
            this.childBlocks.error.setProps({ text: '', isHidden: true });
        }
    }
}
export function validateEmail(event) {
    var input = event.target;
    if (!input.value.length) {
        this.childBlocks.error.setProps({ text: 'Необходимо заполнить', isHidden: false });
    }
    else {
        if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(input.value)) {
            this.childBlocks.error.setProps({ text: '', isHidden: true });
        }
        else {
            this.childBlocks.error.setProps({ text: 'Не валидный формат почты', isHidden: false });
        }
    }
}
export function validatePhone(event) {
    var input = event.target;
    if (!input.value.length) {
        this.childBlocks.error.setProps({ text: 'Необходимо заполнить', isHidden: false });
    }
    else {
        if (/^((8|\+7)[- ]?)?((\d{3})?[- ]?)?[\d- ]{7,10}$/.test(input.value)) {
            this.childBlocks.error.setProps({ text: '', isHidden: true });
        }
        else {
            this.childBlocks.error.setProps({ text: 'Не валидный формат телефона', isHidden: false });
        }
    }
}
