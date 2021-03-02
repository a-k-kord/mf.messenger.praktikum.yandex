import { Block, Children } from '../../core/Block/index.js';
export interface LoginProps {
}
export declare class Login extends Block<LoginProps> {
    constructor(parentElement: HTMLElement, props: LoginProps, children?: Children, tagName?: string);
    render(): string;
}
