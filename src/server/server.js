/* eslint-disable no-console */
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const fetchMeaningCloudData = require('./meaningCloudAPI.js');

dotenv.config({ path: 'config.env' });

const app = express();

//For HEROKU
app.enable('trust proxy');

// 1) GLOBAL MIDDLEWARES

//Implement CORS
app.use(cors());

//Serving static files
app.use(express.static('dist'));

// Set security HTTP headers
app.use(helmet());
//Development logging

//Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour',
});
app.use('/api', limiter);

//prevent parameter pollution
app.use(
  hpp({
    whitelist: ['url', 'txt'],
  })
);

//Data sanitization against XSS
app.use(xss());

//compress response bodies
app.use(compression());

//2) ROUTES
app.get('/', (req, res) => {
  res.sendFile('/dist/index.html');
});

app.get('/nlp/:type&:text', (req, res) => {
  fetchMeaningCloudData(req, res);
});

app.all('*', (req, res) => {
  res.status(404).send(`Can't find  ${req.originalUrl} on this server`);
});

// 3)Setup Server
const port = process.env.PORT || 8080;
// eslint-disable-next-line no-unused-vars
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

// 4)For heroku deployment
const shutdown = (signal) => (err) => {
  console.log(`${signal}...`);
  if (err) console.error(err.stack || err);
  setTimeout(() => {
    console.log('...waited 5s, exiting.');
    process.exit(err ? 1 : 0);
  }, 5000).unref();
};
process
  .on('SIGTERM', shutdown('SIGTERM'))
  .on('SIGINT', shutdown('SIGINT'))
  .on('uncaughtException', shutdown('uncaughtException'));
