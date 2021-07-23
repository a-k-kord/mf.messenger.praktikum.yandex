import { compileTemplate } from '../../core/Template/index';
import template from './template';
import { Block, Props } from '../../core/Block/index';

export interface ImageProps extends Props{
    src?: string,
    alt?: string,
}

export class Image extends Block<ImageProps> {
    render(): string {
        return compileTemplate<ImageProps>(template, {
            props: { ...this.props },
            slots: { ...this.slots },
        });
    }
}
