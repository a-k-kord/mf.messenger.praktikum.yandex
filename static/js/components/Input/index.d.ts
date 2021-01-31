import { Block } from "../../core/Block/index.js";
import { TitleProps } from "../Title/index.js";
export interface InputProps extends TitleProps {
    type?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    isReadonly?: boolean;
    iconStyles?: string;
    validationError?: string;
}
export declare class Input extends Block<InputProps> {
    private _eventsList;
    render(): string;
    addEvent(el: HTMLElement, eventName: keyof HTMLElementEventMap, callback: (this: HTMLElement, ev: HTMLElementEventMap[keyof HTMLElementEventMap]) => {}): void;
    removeEvent(target: HTMLElement): void;
    removeElement(target: HTMLElement): void;
    destroyBlock(): void;
}
