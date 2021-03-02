import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block, Children } from '../../core/Block/index.js';
import { Title } from "../../components/Title";
import { Link } from "../../components/Link";

export interface ErrorProps {
}

export class Error extends Block<ErrorProps> {

    constructor(parentElement: HTMLElement, props: ErrorProps, children: Children = defaultChildren, tagName?: string) {
        super(parentElement, props, children, tagName);
    }

    render(): string {
        return compileTemplate<ErrorProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }
}

const propsHolder: HTMLElement = document.querySelector(`[data-page="Error"]`);
const defaultChildren = {
    errNum: {
        blockConstructor: Title,
        blockProps: {
            stylesBefore: 'error__number',
            text: propsHolder.dataset.errNum,
            size: 'big',
        }
    },
    errMessage: {
        blockConstructor: Title,
        blockProps: {
            stylesBefore: 'error__msg',
            text: propsHolder.dataset.errMessage,
        }
    },
    linkBack: {
        blockConstructor: Link,
        blockProps: {
            linkTo: 'chat.html',
            text: 'Назад к чатам',
            size: 'small',
            theme: 'primary'
        }
    }
};