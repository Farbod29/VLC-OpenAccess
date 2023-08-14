const fs = require("fs");
const moment = require("moment");
const today = moment().format("dddd, MMMM Do YYYY");

const logger = (req, res, next) => {
  fs.appendFile(`./log_per_day/${today}.txt`, logMaker(req), function (err) {
    if (err) throw err;
    // notification();
  });
  next();
};

const logMaker = (req) => {
  let log = `${reqTime(req)} ${req.method} ${req.protocol}://${req.get(
    "host"
  )}${req.originalUrl} ${
    req.ip.includes("::1") || req.ip.includes("127.0.0.1")
      ? "localhost"
      : req.ip
  }\n`;
  return log;
};

const reqTime = (req) => {
  return moment().format(`"h:mm:ss a"`);
};

const notification = () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    "New log added! You will find it in log.txt"
  );
};

module.exports = logger;
