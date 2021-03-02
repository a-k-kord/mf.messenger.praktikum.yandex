import { compileTemplate } from '../../core/Template/index.js';
import template from './template.js';
import { Block, Children, Props } from '../../core/Block/index.js';
import { Title } from "../../components/Title/index.js";
import { Link } from "../../components/Link/index.js";

export interface ErrorProps extends Props{
}

const errors = {
    '404': {
        errNum: 404,
        errMessage: 'Не туда попали'
    },
    '500' : {
        errNum: 500,
        errMessage: 'Мы уже фиксим'
    },
}

export class Error extends Block<ErrorProps> {

    constructor(parentElement: HTMLElement, props: ErrorProps, children?: Children, tagName?: string) {
        let {errNum, errMessage} = errors[404];
        const pathMatch = document.location.pathname.match(/\/error\/(\d+)$/);
        if(pathMatch) {
            errNum = parseInt(pathMatch[1]);
            errMessage = errors[errNum];
        }
        children = children || {
            errNum: {
                blockConstructor: Title,
                blockProps: {
                    stylesBefore: 'error__number',
                    text: errNum,
                    size: 'big',
                }
            },
            errMessage: {
                blockConstructor: Title,
                blockProps: {
                    stylesBefore: 'error__msg',
                    text: errMessage,
                }
            },
            linkBack: {
                blockConstructor: Link,
                blockProps: {
                    type: 'routeLink',
                    linkTo: 'chat',
                    text: 'Назад к чатам',
                    size: 'small',
                    theme: 'primary'
                }
            }
        };
        super(parentElement, props, children, tagName);
    }

    render(): string {
        return compileTemplate<ErrorProps>(template, {
            props: {...this.props},
            slots: {...this.slots}
        });
    }
}
