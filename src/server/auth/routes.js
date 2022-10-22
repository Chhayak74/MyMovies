import express from "express";
import bodyParser from "body-parser";

export class AuthRouter {
    get Router() {
        return this.router;
    }

    constructor({ controller, middleware }) {
        this.router = express.Router();
        this.router.use(bodyParser.json());
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.router.use(bodyParser.text());
        this.router.post("/register", controller.register);
        this.router.post("/login", controller.login);
        this.router.post("/logout", middleware.authenticate, controller.logout);
    }
}
export default AuthRouter;
