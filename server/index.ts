import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { CommonRoutesConfig } from './src/common/common.routes.config';
import { UserRoutesConfig } from './src/users/users.routes.config';
import debug from 'debug';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const port = 3000;
const routes: CommonRoutesConfig[] = [];
process.env['DEBUG'] = 'app';
const debugLog = debug('app');

app.use(express.json());
app.use(cors());

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true }),
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

routes.push(new UserRoutesConfig(app));
const runningMsg = `Server running at http://localhost:${port}`;
app.get('/', (req, res) => {
  res.status(200).send(runningMsg);
});
server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
