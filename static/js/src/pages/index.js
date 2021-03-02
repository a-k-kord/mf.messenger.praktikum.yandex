import { Router } from "../core/Router/index.js";
import { Login } from "./Login/Login.js";
var router = new Router("#app");
router
    .use("/", Login)
    .start();
