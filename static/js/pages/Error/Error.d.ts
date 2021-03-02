import { Block, Children } from '../../core/Block/index.js';
export interface ErrorProps {
}
export declare class Error extends Block<ErrorProps> {
    constructor(parentElement: HTMLElement, props: ErrorProps, children?: Children, tagName?: string);
    render(): string;
}
