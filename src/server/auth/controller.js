import responder from "../utils/responseHandler.js";

const toString = (b64) => Buffer.from(b64, "base64").toString();

export class AuthController {
    constructor({
        validator,
        authService
    }) {
        this.validator = validator;
        this.service = authService;
    }

  register = async (req, res, next) => {
      try {
          const {
              fullName,
              email,
              password: encodedPassword
          } = req.body;
        const password = toString(encodedPassword);
        const { success } = await this.service.register({
            email,
            password,
            fullName
          });
          return responder(res)(null, { success });
      } catch (ex) {
          return next(ex);
      }
  }

  login = async (req, res, next) => {
      try {
          const {
              body: {
                  password: encodedpassword,
                  email
              }
          } = req;
          
          const password = toString(encodedpassword);
          const { userId , token } = await this.service.login({
              password, email
          });
          let session=req.session;
          session.userId=userId;
          return responder(res)(null, { token });
      } catch (ex) {
          console.error(ex);
          return next(ex);
      }
  }

  logout = async (req, res, next) => {
      try {
          const {
              user: { id }
          } = req;
          await this.service.logout({ userId: id });
          req.session.destroy();
          req.user = null;
          return responder(res)(
              null,
              { message: "User logged out successfully" }
          );
      } catch (ex) {
          console.error(ex);
          return next(ex);
      }
  }
}
export default AuthController;
