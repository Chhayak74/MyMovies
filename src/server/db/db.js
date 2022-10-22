
import { Users } from "./users.js";
import { Movies } from "./movies.js";
import { db } from "./connection.js";
export class DB {
    constructor({
        users = new Users({ db }),
        movies = new Movies({ db }),
     } = {}) {
        this.Users = users; 
        this.Movies = movies;
    }
}

export default DB;