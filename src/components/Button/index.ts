import { compileTemplate } from '../../core/Template/index';
import template from './template';
import { Block } from '../../core/Block/index';
import { TitleProps } from '../Title/index';
import { FormInputs } from '../../utils/validation';
import { preventEvent } from '../../utils/dom';

export interface ButtonProps extends TitleProps{
    type?: string,
    formMethod?: string,
    onclick?: string,
    handleMethod?: ()=>{},
    isDisabled?: boolean,
    image?: string // TODO: заменить на внутренний компонент Image
}

export class Button extends Block<ButtonProps> {
    constructor(parentElement, props, children?) {
        super(parentElement, props, children);

        this.addListener(this.getContent(), 'click', handleSubmit.bind(this), `button[type="${props.type}"]`);
    }

    render(): string {
        return compileTemplate<ButtonProps>(template, {
            props: { ...this.props },
            slots: { ...this.slots },
        });
    }
}

function handleSubmit(event: KeyboardEvent | MouseEvent) {
    // preventEvent(event);
    event.preventDefault();
    const data = validateForm(event);
    if (data.isValid && typeof this.props.handleMethod === 'function') {
        this.props.handleMethod(data);
    }
}

function validateForm(event: Event): FormInputs {
    let isValid = true;
    const obj: Record<string, string> = {};
    const form = (<HTMLInputElement>event.target).closest('form');
    const inputs: HTMLInputElement[] = Array.from(form.querySelectorAll('[data-block-name]:not([style*="none"]) *'))
            .filter((item) => item.tagName === 'INPUT') as HTMLInputElement[];
    const errorInputs: HTMLInputElement[] = [];
    if (inputs.length === 1 && inputs[0].value.trim() === '') {
        isValid = false;
    } else {
        inputs.forEach((input: HTMLInputElement) => {
            const inputWrapper: HTMLElement = input.closest('.block-wrapper');
            if (!inputWrapper.style.display || inputWrapper.style.display !== 'none') {
                const customEvent = new Event('blur', {
                    bubbles: true,
                    cancelable: true,
                });

                input.dispatchEvent(customEvent);
                obj[input.name] = input.value;
                const errorBlock: HTMLElement = inputWrapper.querySelector('[data-block-name="error"]');
                if (errorBlock && errorBlock.style.display !== 'none') {
                    isValid = false;
                    errorInputs.push(input);
                }
            }
        });
    }
    return {
        data: obj,
        form,
        errorInputs,
        isValid,
    };
}
