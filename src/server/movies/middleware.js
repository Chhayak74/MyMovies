// import InvalidToken from "../../error/invalidToken.js";
import { JWT } from "../utils/jwt.js";

export class AuthMiddleWare {
    constructor({ jwt = new JWT() } = {}) {
        this.jwt = jwt;
    }

    authenticate = async (req, res, next) => {
        try {
            const { headers: { authorization } } = req;
            const inputToken = (authorization && authorization.split(" ")[1]) || "";
            const { user, token } = await this.jwt.authVerify(inputToken);
            req.user = user;
            res.set("Authorization", `Bearer ${token}`);
            next();
        } catch (err) {
            next(new InvalidToken(err));
        }
    }
}

export default AuthMiddleWare;
