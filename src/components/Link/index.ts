import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from "../../core/Block/index.js";
import { TitleProps } from "../Title";

export interface LinkProps extends TitleProps{
    linkTo: string,
    image?: string   // TODO: заменить на внутренний компонент Image
}

export class Link extends Block<LinkProps> {

    render(): string {
        return compileTemplate<LinkProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }

}