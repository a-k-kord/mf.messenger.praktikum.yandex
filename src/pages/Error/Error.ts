import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from "../../core/Block/index.js";

export interface ErrorProps {
}

export class Error extends Block<ErrorProps> {

    render(): string {
        return compileTemplate<ErrorProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }
}