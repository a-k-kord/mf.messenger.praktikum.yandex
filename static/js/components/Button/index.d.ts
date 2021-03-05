import { Block } from '../../core/Block/index';
import { TitleProps } from '../Title/index';
export interface ButtonProps extends TitleProps {
    type?: string;
    formMethod?: string;
    onclick?: string;
    handleMethod?: () => {};
    isDisabled?: boolean;
    image?: string;
}
export declare class Button extends Block<ButtonProps> {
    constructor(parentElement: any, props: any, children?: any);
    render(): string;
}
