import { Block } from "../../core/Block/index.js";
import { TitleProps } from "../Title/index.js";
export interface ButtonProps extends TitleProps {
    type?: string;
    formMethod?: string;
    image?: string;
}
export declare class Button extends Block<ButtonProps> {
    render(): string;
}
