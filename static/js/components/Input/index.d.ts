import { Block } from '../../core/Block/index';
import { TitleProps } from '../Title/index';
export interface InputProps extends TitleProps {
    type?: string;
    id?: string;
    name?: string;
    accept?: string;
    placeholder?: string;
    isReadonly?: boolean;
    iconStyles?: string;
    validationType?: string;
}
export declare const ValidationMethods: {
    [key: string]: Function;
};
export declare class Input extends Block<InputProps> {
    constructor(parentElement: any, props: any, children: any);
    render(): string;
}
