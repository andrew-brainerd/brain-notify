const axios = require('axios').default;

const jsonHeader = { 'Content-Type': 'application/json' };

const createClient = ({ baseUrl, headers }) => axios.create({ baseURL: baseUrl, headers });

module.exports = {
  createClient,
  jsonHeader
};
