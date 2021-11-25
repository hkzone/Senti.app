const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fetchMeaningCloudData = require('./meaningCloudAPI.js');

dotenv.config({ path: 'config.env' });

const app = express();
app.use(cors());

app.use(express.static('dist'));

// GET route
app.get('/', (req, res) => {
  res.sendFile('/dist/index.html');
});

// Setup Server
const port = process.env.PORT || 8080;
// eslint-disable-next-line no-unused-vars
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}...`);
});

app.get('/nlp/:type&:text', (req, res) => {
  fetchMeaningCloudData(req, res);
});
