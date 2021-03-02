import { Block, Children } from '../../core/Block/index.js';
export interface RegisterProps {
}
export declare class Register extends Block<RegisterProps> {
    constructor(parentElement: HTMLElement, props: RegisterProps, children?: Children, tagName?: string);
    render(): string;
}
