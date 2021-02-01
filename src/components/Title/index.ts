import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block, Props } from "../../core/Block/index.js";

export interface TitleProps extends Props{
    size?: string,
    theme?: string,
    weight?: string,
    text?: string,
}

export class Title extends Block<TitleProps> {

    render(): string {
        return compileTemplate<TitleProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }

}