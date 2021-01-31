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
    iconStyles?: string
}

export class Input extends Block<InputProps> {
    private _eventsList = [];

    render(): string {
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