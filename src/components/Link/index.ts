import { compileTemplate } from '../../core/Template/index';
import template from './template';
import { Block } from '../../core/Block/index';
import { TitleProps } from '../Title/index';
import { Router } from '../../core/Router/index';

export interface LinkProps extends TitleProps {
    linkTo: string,
    type?: string,
    handleMethod?: ()=>{},
    image?: string // TODO: заменить на внутренний компонент Image
}

export class Link extends Block<LinkProps> {
    constructor(parentElement, props, children) {
        super(parentElement, props, children);

        this.addListener(this.getContent(), 'click', handleClick.bind(this), 'a');
    }

    render(): string {
        return compileTemplate<LinkProps>(template, {
            props: { ...this.props },
            slots: { ...this.slots },
        });
    }
}

function handleClick(evt) {
    evt.preventDefault();
    if (typeof this.props.handleMethod === 'function') {
        this.props.handleMethod();
    } else {
        const element: HTMLElement = this.parentElement.querySelector('a');
        const pathnameArr = (element as HTMLAnchorElement).href.split('/');
        const pathname = pathnameArr[pathnameArr.length - 1];
        Router.getInstance().go(`/${pathname}`);
    }
}
