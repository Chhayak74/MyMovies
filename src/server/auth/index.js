import express from "express";
import { AuthRouter } from "./routes.js";
import { AuthController } from "./controller.js";
import { AuthService } from "./service.js";
import { AuthMiddleWare } from "./middleware.js";
import { JWT } from "../utils/jwt.js";
import { DB } from "../db/db.js";

export const authRouter = express.Router();
const db = new DB();
const jwt = new JWT({ db });
const middleware = new AuthMiddleWare({ jwt });
const auth = new AuthRouter({
    middleware,
    controller: new AuthController({
        authService: new AuthService({
            jwt,
            db
        })
    }),
});

// no authentication
authRouter.use("/auth", auth.Router);
authRouter.use(middleware.authenticate);
export default { authRouter };
