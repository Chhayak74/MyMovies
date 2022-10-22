export class Movies {
    add = async ({
        name,
        rating,
        casts,
        genre,
        releaseDate,
        userId: userid
    }) => {
        const query = {
            text: `INSERT INTO movies(name, rating, casts, genre, releaseDate, userid) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
            values: [ name, rating, casts, genre, releaseDate, userid ]
        }
        return this.db.query(query);
    }

    edit = ({
        name, 
        casts,
        rating,
        genre,
        releaseDate,
        id: movieId
    }) => {
        const updatesCasts = '{'+casts.map( v => `\"${v}\"`).join(",")+'}';
        return this.db.query(`UPDATE movies SET name='${name}', genre='${genre}', rating='${rating}', releaseDate='${releaseDate}', casts='${updatesCasts}'  WHERE id=${movieId}`);
    };

    delete = ({
        movieId
    }) => (this.db.query(`DELETE FROM movies WHERE id=${movieId}`));

    list = ({ userId }) => (this.db.query(`SELECT * FROM movies WHERE userid=${userId}`));

    
    

    constructor({ db }) {
        this.name = 'movies';
        this.db = db;
    }
}