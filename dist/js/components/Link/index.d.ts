import { Block } from "../../core/Block/index.js";
import { TitleProps } from "../Title";
export interface LinkProps extends TitleProps {
    linkTo: string;
    onclick?: string;
    image?: string;
}
export declare class Link extends Block<LinkProps> {
    constructor(parentElement: any, props: any, children: any);
    render(): string;
}
export declare function inputsToggleReadonly(event: Event): void;
