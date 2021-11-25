# SENTI.APP

A website that allows users to run SENTIMENT ANALISYS on articles and blogs

## Getting Started

To get started:

- register account MeaningCloud and obtain API key
- make `.env` file containing `PORT=8080 MeaningCloudAPIKey=****************`
- install all project dependencies with `npm install`
- build with `npm run build-prod`
- start server with `npm run start`
- open `localhost/8080`

## backend

The backend uses MeaningCloud [Sentiment Analysis API](https://www.meaningcloud.com/developer/sentiment-analysis) and run using Nodejs and Expresss.

## Build Tool

This project was build with [Webpack V6](https://github.com/webpack/webpack).

## Testing

Testing was done with [Jest](https://github.com/facebook/jest). Test modules can be found at `__test__` folder in the root directory.
