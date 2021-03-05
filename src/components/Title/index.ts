import { compileTemplate } from '../../core/Template/index';
import template from './template';
import { Block, Props } from '../../core/Block/index';

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