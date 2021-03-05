import { Block } from '../../core/Block/index';
import { TitleProps } from '../Title/index';
export interface LinkProps extends TitleProps {
    linkTo: string;
    type?: string;
    handleMethod?: () => {};
    image?: string;
}
export declare class Link extends Block<LinkProps> {
    constructor(parentElement: any, props: any, children: any);
    render(): string;
}
