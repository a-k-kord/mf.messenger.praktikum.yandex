import { Router } from  '../core/Router/index';
import { Login } from  './Login/index';
import { Register } from  './Register/index';
import { Chat } from  './Chat/index';
import { Profile } from  './Profile/index';
import { Error } from  './Error/index';


const router = new Router("#app");

router
    .use("/", Login)
    .use("/login", Login)
    .use("/register", Register)
    .use("/chat", Chat)
    .use("/profile", Profile)
    .use("/error/404", Error)
    .use("/error/500", Error)
    .start();
