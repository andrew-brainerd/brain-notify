const Joi = require('joi');
const discord = require('express').Router();
const { validator } = require('../../utils/validator');
const status = require('../../utils/statusMessages');
const { sendMessage } = require('../../utils/discord');

const postReleaseBody = Joi.object({
  data: Joi.object({
    app: Joi.object({
      name: Joi.string().required()
    }).required(),
    release: Joi.object({
      version: Joi.string().required()
    }).required(),
    user: Joi.object({
      email: Joi.string().required()
    }).required()
  }).required()
});

discord.post('/peapod-release', validator.body(postReleaseBody), async (req, res) => {
  const { body: { data } } = req;
  const token = process.env.PEAPOD_DISCORD_BOT_TOKEN;
  const channel = process.env.PEAPOD_DISCORD_CHANNEL;
  const message = `Released ${data.app.name} version ${data.release.version} [${data.user.email}]`;

  await sendMessage(token, channel, message);

  return status.created(res, { message });
});

module.exports = discord;
