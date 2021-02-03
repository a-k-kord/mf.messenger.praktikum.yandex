import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from "../../core/Block/index.js";
import { TitleProps } from "../Title/index.js";

export interface InputProps extends TitleProps{
    type?: string,
    id?: string,
    name?: string,
    placeholder?: string,
    isReadonly?: boolean,
    iconStyles?: string,
    validationType?: string,
}


const ValidationMethods: {[key: string]: Function} = {
    login: validateLogin,
    email: validateEmail,
};

export class Input extends Block<InputProps> {

    constructor(parentElement, props, children) {
        super(parentElement, props, children)

        if(props.validationType) {
            this.addListener(this.getContent(), 'blur', ValidationMethods[props.validationType].bind(this), 'input');
            this.addListener(this.getContent(), 'focus', ValidationMethods[props.validationType].bind(this), 'input');
        }
    }

    render(): string {
        return compileTemplate<InputProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }


}


// TODO: пример валидации, надо доделать.
function validateLogin(event: Event) {
    const input: HTMLInputElement = (<HTMLInputElement>event.target);
    if(!input.value.length) {
        this.childBlocks.error.setProps({text: 'Необходимо заполнить', isHidden: false})
    } else {
        if(input.value.length < 15) {
            this.childBlocks.error.setProps({text: '', isHidden: true})
        } else {
            this.childBlocks.error.setProps({text: 'Слишком длинный логин', isHidden: false})
        }
    }

}

function validateEmail(event: Event) {
    const input: HTMLInputElement = (<HTMLInputElement>event.target);
    if(!input.value.length) {
        this.childBlocks.error.setProps({text: 'Необходимо заполнить', isHidden: false})
    } else {
        if(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(input.value)) {
            this.childBlocks.error.setProps({text: '', isHidden: true})
        } else {
            this.childBlocks.error.setProps({text: 'Не валидный формат почты', isHidden: false})
        }
    }
}