import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from "../../core/Block/index.js";

export interface ChatProps {
}

export class Chat extends Block<ChatProps> {

    render(): string {
        return compileTemplate<ChatProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }
}