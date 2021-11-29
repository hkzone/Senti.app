const dotenv = require('dotenv');
const axios = require('axios').default;

dotenv.config({ path: 'config.env' });

//list of know MeaningCloudAPI error codes
const meaningcloudErrors = [
  '100',
  '101',
  '102',
  '103',
  '104',
  '105',
  '200',
  '201',
  '202',
  '203',
  '204',
  '205',
  '206',
  '207',
  '212',
  '214',
  '215',
];

//******************FETCH DATA FROM API FUNCTION******************************************/

const fetchMeaningCloudData = async (req, res) => {
  try {
    const response = await axios.post(
      `https://api.meaningcloud.com/sentiment-2.1?key=${
        process.env.MeaningCloudAPIKey
      }&${req.params.type}=${encodeURIComponent(req.params.text)}&lang=auto`
    );

    //check if status is success
    if (response.data.status.code === '0') {
      res.status(200).json({
        status: 'success',
        data: response.data,
      });
    }

    // if error check if it's known API error
    else if (
      meaningcloudErrors.find((el) => el === response.data.status.code) !== -1
    ) {
      res.status(200).json({
        status: 'error',
        data: response.data,
      });
    }

    //if no know errors throw error
    else throw new Error('undentified Api Error');
  } catch (error) {
    // eslint-disable-next-line no-console
    res.status(500).json({
      status: 'error',
      data: {
        status: {
          code: '-1',
          msg: 'Something went very wrong. Please try again later.',
        },
      },
    });
    // eslint-disable-next-line no-console
    console.log('error', error.message);
  }
};

module.exports = fetchMeaningCloudData;
