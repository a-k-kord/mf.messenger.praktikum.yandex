import { Block } from '../../core/Block/index.js';
import { TitleProps } from '../Title/index.js';
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
