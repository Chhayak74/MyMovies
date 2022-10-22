import express from "express";
import { MoviesRouter } from "./routes.js";
import { MoviesController } from "./controller.js";
import { MoviesService } from "./service.js";
import { JWT } from "../utils/jwt.js";
import { DB } from "../db/db.js";

export const moviesRouter = express.Router();
const db = new DB();
const jwt = new JWT({ db });
const movies = new MoviesRouter({
    controller: new MoviesController({
        moviesService: new MoviesService({
            jwt,
            db
        })
    }),
});

moviesRouter.use("/movies", movies.Router);
export default { moviesRouter };
