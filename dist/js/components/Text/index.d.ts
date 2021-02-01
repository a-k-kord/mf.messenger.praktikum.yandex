import { Block } from "../../core/Block/index.js";
export interface LinkProps {
    linkTo: string;
    text?: string;
}
export declare class Link extends Block<LinkProps> {
    render(): string;
}
