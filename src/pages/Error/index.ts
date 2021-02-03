import { Error } from './Error.js';
import { Link } from '../../components/Link/index.js';
import { Title } from '../../components/Title/index.js';

const mountElement: HTMLElement = document.querySelector('#app');
const propsHolder: HTMLElement = document.querySelector(`[data-page="Error"]`);

const error = new Error(mountElement, {},
    {
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
    });

setTimeout(() => {
    error.childBlocks.errMessage.setProps({
        text: 'Бывает, что ж поделать... ',
    })
    error.childBlocks.linkBack.setProps({text: 'Назад к чатам, скорее!'})
}, 3000);