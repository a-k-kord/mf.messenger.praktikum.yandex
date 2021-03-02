import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from '../../core/Block/index.js';
import { TitleProps } from '../Title/index.js';
import { validateEmail, validatePasswordConfirm, validatePhone, validateLimitedString } from "../../utils/validation.js";

export interface InputProps extends TitleProps{
    type?: string,
    id?: string,
    name?: string,
    accept?: string,
    placeholder?: string,
    isReadonly?: boolean,
    iconStyles?: string,
    validationType?: string,
}


export const ValidationMethods: {[key: string]: Function} = {
    limitedString: validateLimitedString,
    email: validateEmail,
    passwordConfirm: validatePasswordConfirm,
    phone: validatePhone
};

export class Input extends Block<InputProps> {

    constructor(parentElement, props, children) {
        super(parentElement, props, children)

        if(props.validationType) {
            this.addListener(this.getContent(), 'blur', ValidationMethods[props.validationType].bind(this), 'input');
            this.addListener(this.getContent(), 'focus', ValidationMethods[props.validationType].bind(this), 'input');
        }
        if(props.type === 'file') {
            this.addListener(this.getContent(), 'change', setUploadedFileName.bind(this), 'input[type="file"]');
        }
    }

    render(): string {
        return compileTemplate<InputProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }

}


function setUploadedFileName(event) {
    const input: HTMLInputElement = event.target;
    const filename = input.value.split('\\').pop()
    const labelEl: HTMLElement = document.querySelector('.uploaded__file-name')
    const errorEl: HTMLElement = document.querySelector('.uploaded__error')
    if (filename) {
        labelEl.textContent = filename
        labelEl.hidden = false
        input.parentElement.style.display = 'none'
        errorEl.hidden = true
    } else {
        labelEl.hidden = true
        errorEl.hidden = false
        input.parentElement.style.display = 'block'
    }
}
