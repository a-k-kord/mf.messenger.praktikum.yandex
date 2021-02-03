import { Block } from "../../core/Block/index.js";
import { TitleProps } from "../Title/index.js";
export interface ButtonProps extends TitleProps {
    type?: string;
    formMethod?: string;
    onclick?: string;
    image?: string;
}
export declare class Button extends Block<ButtonProps> {
    constructor(parentElement: any, props: any, children: any);
    render(): string;
}
