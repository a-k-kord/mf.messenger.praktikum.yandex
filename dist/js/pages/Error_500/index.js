import { Error } from './Error.js';
import { Link } from "../../components/Link/index.js";
var mountElement = document.querySelector('#app');
var error404 = new Error({
    errNum: '404',
    errMessage: 'Не туда попали',
}, mountElement, {
    link: {
        blockConstructor: Link,
        blockProps: {
            linkTo: 'chat.html',
            text: 'Назад к чатам'
        }
    }
});
setTimeout(function () {
    error404.setProps({
        errMessage: 'Не туда попали. Нет, серьезно, не туда! ',
    });
    error404.childBlocks.link.setProps({ text: 'Назад к чатам / В будущее' });
}, 3000);
