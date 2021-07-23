import { Router } from '../core/Router/index.js';
import { Login } from './Login/index.js';
import { Register } from './Register/index.js';
import { Chat } from './Chat/index.js';
import { Profile } from './Profile/index.js';
import { Error } from './Error/index.js';
var router = new Router('#app');
router
    .use('/', Login)
    .use('/login', Login)
    .use('/register', Register)
    .use('/chat', Chat)
    .use('/profile', Profile)
    .use('/error/404', Error)
    .use('/error/500', Error)
    .start();
