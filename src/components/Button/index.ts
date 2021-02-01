import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from "../../core/Block/index.js";
import { TitleProps } from "../Title/index.js";

export interface ButtonProps extends TitleProps{
    type?: string,
    formMethod?: string,
    image?: string   // TODO: заменить на внутренний компонент Image
}

function preventSubmit(event) {
    event.preventDefault();
    // const obj = {};
    // for(let form of document.forms) {
    //     form.addEventListener('submit', event => {
    //         for (let input of event.target.elements) {
    //             if (input.tagName === 'INPUT') {
    //                 obj[input.id] = input.value
    //             }
    //         }
    //         console.log(obj);
    //     });
    // }
}

export class Button extends Block<ButtonProps> {

    constructor(parentElement, props, children) {
        super(parentElement, props, children)

        if(props.type === 'submit') {
            this.addListener(this.getContent(), 'submit', preventSubmit.bind(this), 'form');
        }
    }

    render(): string {
        return compileTemplate<ButtonProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }

}