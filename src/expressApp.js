import express from "express";
import expressSession from "express-session";
import connectPgSimple from "connect-pg-simple";
import compression from "compression";
import http from "http";

import index from "./server/index.js";
import "dotenv/config";
import { pool } from "../src/server/db/connection.js";

const origins = {};

if (process.env.NODE_ENV !== "production") {
    origins["http://localhost:5100"] = "http://localhost:5100";
    origins["http://localhost:6100"] = "http://localhost:6100";
}

const parseOrigin = ({ origin }) => (origin && origin.toLowerCase()) || "";

const origin = ({ headers }) => origins[parseOrigin(headers)] || process.env.BASE_URL;


const pgSession = connectPgSimple(expressSession);


export default class App {
    async start() {
        try {
            http.createServer(this.app).listen(process.env.HTTP_PORT, () => {
                console.info(`http server created for port no ${process.env.HTTP_PORT}`);
            });
        } catch (ex) {
            console.error(ex);
        }
    }

    constructor() {
        this.app = express();
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", origin(req));
            res.header("Access-Control-Allow-Methods", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Max-Age", "1000");
            if (req.method === "OPTIONS") {
                res.writeHead(204);
                res.end();
                return;
            }
            next();
        });

        // compressing api response
        this.app.use(compression());

        this.app.use(expressSession({
            store: new pgSession({
              pool,
              tableName : 'user_sessions',
              createTableIfMissing: true
            }),
            secret: process.env.COOKIE_SECRET,
            resave: false,
            cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
          }));

        this.app.use("/api", index);
        this.app.get("/health", (req, res) => res.send("Health check route"));
    }
}
