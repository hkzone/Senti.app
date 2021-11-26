# SENTI.APP

A website that allows users to run SENTIMENT ANALYSIS on articles and blogs

## Getting Started

Getting Started:

- register account with [MeaningCloud](https://www.meaningcloud.com/developer/sentiment-analysis) and obtain API key
- make `.env` file containing `PORT=8080 MeaningCloudAPIKey=***********`
- install all the dependencies listed in the package.json file with `npm install`
- build with `npm run build-prod`
- start server with `npm run start`
- open `localhost:8080`

## backend

The backend uses Node.js and Express.

## Build Tool

This project uses [Webpack 5](https://github.com/webpack/webpack).

## Testing

Testing is done with Jest. [Jest](https://github.com/facebook/jest). This project has a Testing Units that can be found at `__test__` folder in the root directory.
To run tests you can use the following NPM command: `$ npm run test`
