import { Block, Children, Props } from '../../core/Block/index';
import { FormInputs } from '../../utils/validation';
export interface LoginProps extends Props {
}
export declare class Login extends Block<LoginProps> {
    static pathname: string;
    constructor(parentElement: HTMLElement, props: LoginProps, children?: Children, tagName?: string);
    loginUser(inputs: FormInputs): void;
    render(): string;
}
