import { Block, Children } from '../../core/Block/index.js';
export interface ChatProps {
}
export declare class Chat extends Block<ChatProps> {
    constructor(parentElement: HTMLElement, props: ChatProps, children?: Children, tagName?: string);
    render(): string;
}
