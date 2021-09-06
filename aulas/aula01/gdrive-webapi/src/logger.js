import pino from "pino";
const looger = pino({
    prettyPrint: {
        ignore: "pid, hostname"
    }
});

export { looger };