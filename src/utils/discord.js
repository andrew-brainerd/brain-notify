const { DISCORD_API_URL } = require('../constants/discord');
const { createClient, jsonHeader } = require('./client');

const getClient = token => createClient({
  baseUrl: DISCORD_API_URL,
  headers: {
    ...jsonHeader,
    'Authorization': `Bot ${token}`
  }
});

const sendMessage = async (token, channel, message) => {
  const response = await getClient(token).post(`/webhooks/${channel}`, { content: message });

  return response;
};

module.exports = {
  sendMessage
};
