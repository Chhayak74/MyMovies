import { JWT } from "../utils/jwt.js";
import { Crypto } from "../utils/crypto.js";

export class AuthService {
    constructor({
        db,
        jwt = new JWT(),
        crypto = new Crypto(),
    }) {
        this.db = db;
        this.jwt = jwt;
        this.crypto = crypto;
    }

    async register({
        email,
        fullName,
        password
    }) {
        // salt is used to hash password before storing it
        // password is in base64 format
        const { salt, hashed: hashedPassword } = this.crypto.hash(password);
         // passwordSecret is used to create pinToken
        const passwordSecret = this.crypto.secret();
        const updateObj = {
            fullName,
            email,
            salt,
            secret: this.crypto.secret(),
            password: hashedPassword,
            passwordSecret
        };
        await this.db.Users.register(updateObj);
        const token = this.jwt.token(email, updateObj.secret);
        return {
            success: true
        };
    }

   

    async login({
        password, email,
    }) {
        const { rows } = await this.db.Users.findOne({ email, password });
        const user = rows[0];
        if (!user) {
            throw new NotFoundError(404, "User not Found");
        }
        const isPasswordVerified = this.crypto.verify(
            password,
            user.password.toString(),
            user.salt.toString()
        );
        if (!isPasswordVerified) {
            throw new Error("Oh no 😓 Incorrect Password. Try again!");
        }
        const secret= this.crypto.secret();
        await this.db.Users.update({ secret, userId: user.id })
        return { userId: user.id, token: await this.jwt.token(user.email, secret)};
    }

    async getToken(user) {
        const { email, secret } = user;
        return this.jwt.token(email, secret);
    }

    async logout({ userId }) { 
        return this.db.Users.logout({ userId });
     }
}
export default AuthService;
