import jwt from "jsonwebtoken";

export class JWT {
    static get EnvSecret() {
        return process.env.SECRET_KEY;
    }

    async authVerify(token) {
        const { sub } = jwt.decode(token);
        const { rows } = await this.db.Users.findOne({ email: sub });
        const user = rows[0];
        jwt.verify(token, JWT.EnvSecret + (user.secret || ""), this.JWTConst);
        return { token: await this.token(sub, user.secret), user };
    }

    get JWTConst() {
        return {
            issuer: this.issuer,
            audience: this.audience,
            expiresIn: this.expiresIn,
        };
    }

    token(sub, ext = "") {
        return jwt.sign({ sub }, JWT.EnvSecret + ext, this.JWTConst);
    }

    constructor({
        issuer = "mymovies",
        audience = "mymovies.in",
        expiresIn = "720h",
        db
    } = {}) {
        this.db = db;
        this.issuer = issuer;
        this.audience = audience;
        this.expiresIn = expiresIn;
        this.secret = process.env.SECRET_KEY;
    }
}

export default JWT;
