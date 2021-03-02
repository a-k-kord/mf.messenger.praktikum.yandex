import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from '../../core/Block/index.js';
import { TitleProps } from '../Title/index.js';
import { FormInputs } from "../../utils/validation.js";

export interface ButtonProps extends TitleProps{
    type?: string,
    formMethod?: string,
    onclick?: string,
    handleMethod?: ()=>{},
    isDisabled?: boolean,
    image?: string   // TODO: заменить на внутренний компонент Image
}

export class Button extends Block<ButtonProps> {

    constructor(parentElement, props, children) {
        super(parentElement, props, children)

        this.addListener(this.getContent(), 'click', handleSubmit.bind(this), 'button[type="submit"]');
    }

    render(): string {
        return compileTemplate<ButtonProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }

}

function handleSubmit(event: Event) {
    event.preventDefault();
    const data = validateForm(event);
    if(data.isValid && typeof this.props.handleMethod === 'function') {
        this.props.handleMethod(data);
    }
}

function validateForm(event: Event): FormInputs {
    let isValid = true;
    const obj: Record<string, string> = {}
    const form = (<HTMLInputElement>event.target).closest('form')
    const inputs = form.querySelectorAll('[data-block-name]:not([style*="none"]) > div > input')
    const errorInputs: HTMLInputElement[] = [];
    inputs.forEach((input: HTMLInputElement) => {
        const inputWrapper: HTMLElement = input.closest('.block-wrapper');
        if(!inputWrapper.style.display || inputWrapper.style.display !== 'none') {
            const event = new Event('blur', {
                bubbles: true,
                cancelable: true,
            });

            input.dispatchEvent(event);
            obj[input.name] = input.value
            const errorBlock: HTMLElement = inputWrapper.querySelector('[data-block-name="error"]');
            if(errorBlock.style.display !== 'none') {
                isValid = false;
                errorInputs.push(input);
            }
        }
    })
    return {
        data: obj,
        form,
        errorInputs,
        isValid
    };
}