const morgan = require('morgan');

morgan.token('custom', function (req, res) {
  const method = req.method;
  const url = req.originalUrl;
  const statusCode = res.statusCode;

  let logLevel;
if (statusCode >= 200 && statusCode < 300) {
  logLevel = 'INFO';
} else if (statusCode >= 300 && statusCode < 400) {
  logLevel = 'WARN';
} else if (statusCode >= 400 && statusCode < 500) {
  logLevel = 'ERROR';
} else if (statusCode >= 500) {
  logLevel = 'ERROR'; // 또는 'FATAL' 또는 다른 원하는 레벨
} else {
  logLevel = 'INFO';
}

  return `[${new Date().toISOString()}] [${logLevel}] [Status: ${statusCode}] ${method} ${url} - ${statusCode}`;
});

const morganMiddleware = morgan(':custom', {
  stream: null,
});
module.exports = morganMiddleware;