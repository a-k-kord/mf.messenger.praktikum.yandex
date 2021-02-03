import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from '../../core/Block/index.js';

export interface RegisterProps {
}

export class Register extends Block<RegisterProps> {

    render(): string {
        return compileTemplate<RegisterProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }
}