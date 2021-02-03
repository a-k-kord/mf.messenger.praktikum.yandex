import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block } from '../../core/Block/index.js';
import { TitleProps } from '../Title';
import { preventEvent } from '../../utils/dom.js';

export interface LinkProps extends TitleProps{
    linkTo: string,
    onclick?: string,
    image?: string   // TODO: заменить на внутренний компонент Image
}

export class Link extends Block<LinkProps> {
    constructor(parentElement, props, children) {
        super(parentElement, props, children)

        if(props.onclick) {
            let handler: (event: Event) => void = ()=>{};
            switch(props.onclick) {
                case 'toggleReadonly': handler = inputsToggleReadonly.bind(this); break;
            }
            this.addListener(this.getContent(), 'click', handler, 'a');
        }
    }

    render(): string {
        return compileTemplate<LinkProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }

}

export function inputsToggleReadonly(event: Event){
    preventEvent(event);
    const form = (<HTMLInputElement>event.target).closest('form');
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.toggleAttribute('readonly');
    });
}