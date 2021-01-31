import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from "../../core/Block/index.js";

export interface LoginProps{
}

export class Login extends Block<LoginProps> {

    render(): string {
        return compileTemplate<LoginProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }
}