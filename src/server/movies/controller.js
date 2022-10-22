import responder from "../utils/responseHandler.js";

export class MoviesController {
    constructor({
        validator,
        moviesService
    }) {
        this.validator = validator;
        this.service = moviesService;
    }

  add = async (req, res, next) => {
      try {
          if(req.session.userId) {
            await this.service.add({ ...req.body, userId: req.user.id });
          return responder(res)(null, { success: true });
          }else{
            return responder(res)(null, { success: false, message: "Please login again" });
          }
      } catch (ex) {
          return next(ex);
      }
  }

  delete = async (req, res, next) => {
    try {
        const movieId = req.params.id;
        await this.service.delete( { movieId });
        return responder(res)(null, { success: true });
    } catch (ex) {
        return next(ex);
    }
}

edit = async (req, res, next) => {
    try {
        const payload = { id: req.params.id, ...req.body };
        await this.service.edit( payload );
        return responder(res)(null, { success: true });
    } catch (ex) {
        return next(ex);
    }
}

list = async (req, res, next) => {
    try {
        const data = await this.service.list({ userId: req.user.id });
        return responder(res)(null, { success: true, data });
    } catch (ex) {
        return next(ex);
    }
}
}
export default MoviesController;
