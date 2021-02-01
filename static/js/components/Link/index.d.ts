import { Block } from "../../core/Block/index.js";
import { TitleProps } from "../Title";
export interface LinkProps extends TitleProps {
    linkTo: string;
    image?: string;
}
export declare class Link extends Block<LinkProps> {
    render(): string;
}
