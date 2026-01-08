import fs from "fs";

function logHistory(req, res, next) {
  const logEntry = `${new Date().toISOString()} - ${req.method} ${
    req.originalUrl
  }\n`;

  fs.appendFile("logs/history.log", logEntry, (err) => {
    if (err) {
      console.error("Failed to write log entry:", err);
    }
  });
  next();
}

export default logHistory;
