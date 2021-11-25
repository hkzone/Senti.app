const dotenv = require('dotenv');
const axios = require('axios').default;

dotenv.config({ path: 'config.env' });

const fetchMeaningCloudData = async (req, res) => {
  try {
    const response = await axios.post(
      `https://api.meaningcloud.com/sentiment-2.1?key=${
        process.env.MeaningCloudAPIKey
      }&${req.params.type}=${encodeURIComponent(req.params.text)}&lang=en`
    );
    res.status(200).json({
      status: 'success',
      data: response.data,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
  }
};

module.exports = fetchMeaningCloudData;
