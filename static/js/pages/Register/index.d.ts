import { Block, Children, Props } from '../../core/Block/index.js';
import { FormInputs } from "../../utils/validation.js";
export interface RegisterProps extends Props {
}
export declare class Register extends Block<RegisterProps> {
    constructor(parentElement: HTMLElement, props: RegisterProps, children?: Children, tagName?: string);
    registerUser(inputs: FormInputs): void;
    render(): string;
}
