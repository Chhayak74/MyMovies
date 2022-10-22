export class MoviesService {
    constructor({
        db
    }) {
        this.db = db;
    }

    async add(movieData) {
        return this.db.Movies.add(movieData);
    }

    async edit(movieData) {
        return this.db.Movies.edit(movieData);
    }

    async delete(movieData) {
        return this.db.Movies.delete(movieData);
    }

    async list(movieData) {
        const { rows } = await this.db.Movies.list(movieData);
        return rows;
    }
}
export default MoviesService;
