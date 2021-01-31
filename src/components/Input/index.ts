import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from "../../core/Block/index.js";
import { removeHTMLElement } from "../../utils/dom.js";
import { TitleProps } from "../Title/index.js";

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
function validateLogin(parent: HTMLElement, event: Event) {
    const input = parent.querySelector('input');
    if(input.value.length > 20) {
        this.childBlocks.error.setProps({text: 'Слишком длинный логин', isHidden: false})
    }
}

function validateEmail(parent: HTMLElement, event: Event) {
    const input = parent.querySelector('input');
    if(! new RegExp('/^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/').test(input.value)) {
        this.childBlocks.error.setProps({text: 'Не валидный формат почты', isHidden: false})
    }
}

export class Input extends Block<InputProps> {
    private _eventsList = [];

    render(): string {
        this.addEvent(this.getContent(), 'blur', validateLogin.bind(this));
        return compileTemplate<InputProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }

    public addEvent(el: HTMLElement, eventName: keyof HTMLElementEventMap , callback: (this:HTMLElement, ev: HTMLElementEventMap[keyof HTMLElementEventMap])=>{}): void {
        const cb = el.addEventListener(eventName, callback);
        this._eventsList.push({ el, name: eventName, callback: cb })
    }

    public removeEvent(target: HTMLElement): void {
        this._eventsList
            .filter(({ el }) => el === target)
            .forEach(({ el, eventName, callback }) => {
                el.removeEventListener(eventName, callback)
            });
    }

    public removeElement(target: HTMLElement): void {
        this.removeEvent(target);
        removeHTMLElement(target);
    }

    destroyBlock() {
        this._eventsList.forEach(({ el, eventName, callback }) => {
            el.removeEventListener(eventName, callback)
        })
    }
}