# SENTI.APP

<img src="https://github.com/hkzone/Senti.app/blob/master/demo/demo.gif" alt="Senti.app" width="612px">

## Description

SENTI.APP is a single-page web application that allows users to perform a detailed **multilingual sentiment** analysis of texts from different sources.

It identifies the positive, negative, neutral polarity in any text, including comments in surveys and social media. It also **extracts sentiment at the document or aspect-based level**. In order to do this, the local polarity of the different sentences in the text is identified and the relationship between them evaluated, resulting in a global polarity value for the whole text.

Differentiators:

- It extracts aspect-based sentiment.
- It distinguishes facts and opinions.
- It detects irony and polarity disagreement.

## Technologies Used

- JavaScript
- [Node.js](https://nodejs.org/) / [Express.js](https://expressjs.com/)
- HTML / [SASS](https://sass-lang.com/)
- [Webpack 5](https://github.com/webpack/webpack)
- [axios](https://www.npmjs.com/package/axios)
- [particles.js](https://github.com/VincentGarreau/particles.js/)
- [MeaningCloud API](https://www.meaningcloud.com)
- [Workbox](https://developers.google.com/web/tools/workbox)
- [Jest](https://github.com/facebook/jest)

## Getting Started

### Prerequisites

Make sure Node and npm are installed from the terminal

```bash
$ node -v
$ npm -v
```

---

### Installation

1. Fork this repo, then clone the app down to your computer:

```bash
$ git clone https://github.com/*.git
```

2. `cd` into your new folder and install all the
   dependencies by running:

```bash
$ npm i
```

3. Sign up for API keys with [MeaningCloud](https://www.meaningcloud.com/developer/sentiment-analysis)
   <br>

4. Configure environment variables by creating new `.env` file in the root of your project. Fill the file with variables as bellow:

```bash
  NODE_ENV=development
  PORT=8080
  MeaningCloudAPIKey=**************************
```

5. Run the app in development mode at http://localhost:8081/, in production mode at http://localhost:8080/

   |       Command        |         Action         |
   | :------------------: | :--------------------: |
   | `npm run build-prod` |     Build project      |
   |     `npm start`      |      Run project       |
   |    `npm run dev`     | Run webpack dev server |

## Testing

Testing is done with [Jest](https://github.com/facebook/jest). This project has a Testing Units that can be found at `__test__` folder in the root directory.
To run tests you can use the following NPM command:

```
$ npm run test
```

## Error handling

- User will be informed about invalid URLs or if inputed text is less then 5 or more then 10000 characters.
- There will be notification with description for all errors returned by MeaningCloud's public APIs.
- There will be notification for any other errors.
