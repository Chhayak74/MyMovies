import express from "express";
import bodyParser from "body-parser";

export class MoviesRouter {
    get Router() {
        return this.router;
    }

    constructor({ controller, middleware }) {
        this.router = express.Router();
        this.router.use(bodyParser.json());
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.router.use(bodyParser.text());
        this.router.post("/add", controller.add);
        this.router.post("/edit/:id", controller.edit);
        this.router.post("/delete/:id", controller.delete);
        this.router.post("/list", controller.list);
    }
}
export default MoviesRouter;
