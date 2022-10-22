import "dotenv/config";
import cluster from "cluster";
import numCPUs from "os";

import App from "./expressApp.js";

(async () => {
    // cluster is working for using all the available nodes
    if (cluster.isMaster) {
        const cpus = ((process.env.NODE_ENV === "production") && numCPUs.cpus().length) || 1;
        console.info(`No of cpus: ${cpus}`);
        console.info(`Master ${process.pid} is running`);

        for (let i = 0; i < cpus; i += 1) {
            cluster.fork(process.env);
        }
        cluster.on("exit", (deadWorker) => {
            // restart the worker
            const worker = cluster.fork(process.env);
            // Note the process IDS
            const newPID = worker.process.pid;
            const oldPID = deadWorker.process.pid;

            // console the event
            console.info(`worker ${oldPID} died`);
            console.info(`worker ${newPID} born.`);
        });
    } else {
        new App().start();
        console.info(`Worker ${process.pid} started`);
    }
})();
