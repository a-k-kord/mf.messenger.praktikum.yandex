import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block, Props } from '../../core/Block/index.js';

export interface ImageProps extends Props{
    src?: string,
    alt?: string,
}

export class Image extends Block<ImageProps> {

    render(): string {
        return compileTemplate<ImageProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }

}