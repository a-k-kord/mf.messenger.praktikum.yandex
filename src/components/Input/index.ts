import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block, Children } from "../../core/Block/index.js";
import { removeHTMLElement } from "../../utils/dom.js";
import { TitleProps } from "../Title/index.js";
import { Listeners } from "../../core/EventBus";

export interface InputProps extends TitleProps{
    type?: string,
    id?: string,
    name?: string,
    placeholder?: string,
    isReadonly?: boolean,
    iconStyles?: string,
    validationError?: string,
}

// TODO: пример валидации, надо доделать.
function validateLogin(event: Event) {
    const input: HTMLInputElement = (<HTMLInputElement>event.target);
    if(input.value.length > 10) {
        this.childBlocks.error.setProps({text: 'Слишком длинный логин', isHidden: false})
    } else {
        this.childBlocks.error.setProps({text: '', isHidden: true})
    }
}

function validateEmail(event: Event) {
    const input: HTMLInputElement = (<HTMLInputElement>event.target);
    if(! new RegExp('/^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/').test(input.value)) {
        this.childBlocks.error.setProps({text: 'Не валидный формат почты', isHidden: false})
    } else {
        this.childBlocks.error.setProps({text: '', isHidden: true})
    }
}

export class Input extends Block<InputProps> {

    constructor(parentElement, props, children) {
        super(parentElement, props, children);
        this.addListener(this.getContent(), 'blur', validateLogin.bind(this), 'input');
    }

    render(): string {
        return compileTemplate<InputProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }


}