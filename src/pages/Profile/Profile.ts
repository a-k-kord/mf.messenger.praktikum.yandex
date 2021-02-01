import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from "../../core/Block/index.js";

export interface ProfileProps {
}

export class Profile extends Block<ProfileProps> {

    render(): string {
        return compileTemplate<ProfileProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }
}