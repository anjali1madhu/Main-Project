const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "app.log");

function logError(error) {
  const log = `[${new Date().toISOString()}] ERROR: ${error}\n`;
  fs.appendFileSync(logFile, log);
}

function logInfo(message) {
  const log = `[${new Date().toISOString()}] INFO: ${message}\n`;
  fs.appendFileSync(logFile, log);
}

module.exports = { logError, logInfo };
