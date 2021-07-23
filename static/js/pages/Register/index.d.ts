import { Block, Children, Props } from '../../core/Block/index';
import { FormInputs } from '../../utils/validation';
export interface RegisterProps extends Props {
}
export declare class Register extends Block<RegisterProps> {
    static pathname: string;
    constructor(parentElement: HTMLElement, props: RegisterProps, children?: Children, tagName?: string);
    registerUser(inputs: FormInputs): void;
    render(): string;
}
