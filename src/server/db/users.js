export class Users {
    register = async ({
        fullName,
        email,
        password,
        salt,
        secret,
        passwordSecret
    }) => {
        const query = {
            text: `INSERT INTO users(fullName, email, password, salt, secret, passwordSecret) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
            values: [ fullName, email, password, salt, secret, passwordSecret ]
        }
        return this.db.query(query);
    }

    login = ({
        email, 
        password
    }) => {
        const query = {
            text: 'SELECT email FROM users WHERE email=$1 AND password=$2',
            values: [ email, password ]
        }
        return this.db.query(query);
    }

    findOne = ({
        email
    }) => {
        const query = {
            text: 'SELECT * FROM users WHERE email=$1',
            values: [ email ]
        }
        return this.db.query(query);
    }

    logout = ({ userId }) => {
        const query = `UPDATE users SET secret=NULL, passwordSecret=NULL WHERE id=${userId}`;
        return this.db.query(query);
    }

    update = ({ userId , secret }) => {
        const query = `UPDATE users SET secret='${secret}' WHERE id=${userId}`;
        return this.db.query(query);
    }

    
    

    constructor({ db }) {
        this.name = 'users';
        this.db = db;
    }
}