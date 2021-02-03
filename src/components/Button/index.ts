import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from "../../core/Block/index.js";
import { TitleProps } from "../Title/index.js";
import { inputsToggleReadonly } from "../Link/index.js";

export interface ButtonProps extends TitleProps{
    type?: string,
    formMethod?: string,
    onclick?: string,
    image?: string   // TODO: заменить на внутренний компонент Image
}


export class Button extends Block<ButtonProps> {

    constructor(parentElement, props, children) {
        super(parentElement, props, children)

        if(props.type === 'submit') {
            let handler: (event: Event) => void = ()=>{};
            switch(props.onclick) {
                case 'toggleReadonly': handler = inputsToggleReadonly; break;
                case 'submit':
                default: handler = validateForm;
            }
            this.addListener(this.getContent(), 'submit', handler.bind(this), 'form');
        }
    }

    render(): string {
        return compileTemplate<ButtonProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }

}


function validateForm(event: Event) {
    event.preventDefault();
    const obj = {}
    const form = (<HTMLInputElement>event.target).closest('form')
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        const event = new Event('blur', {
            bubbles: true,
            cancelable: true,
        });

        input.dispatchEvent(event);
        obj[input.id] = input.value
    })
    console.log(obj);
}