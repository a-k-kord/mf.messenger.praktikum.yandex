import { Block, Props } from "../../core/Block/index.js";
export interface TitleProps extends Props {
    size?: string;
    theme?: string;
    weight?: string;
    text?: string;
}
export declare class Title extends Block<TitleProps> {
    render(): string;
}
