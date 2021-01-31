import { Block } from "../../core/Block/index.js";
import { TitleProps } from "../Title/index.js";
export interface InputProps extends TitleProps {
    type?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    isReadonly?: boolean;
    iconStyles?: string;
    validationError?: string;
}
export declare class Input extends Block<InputProps> {
    private _eventsList;
    render(): string;
}
