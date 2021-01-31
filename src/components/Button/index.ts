import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from "../../core/Block/index.js";
import { TitleProps } from "../Title/index.js";

export interface ButtonProps extends TitleProps{
    type?: string,
    formMethod?: string,
    image?: string   // TODO: заменить на внутренний компонент Image
}

export class Button extends Block<ButtonProps> {

    render(): string {
        return compileTemplate<ButtonProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }

}