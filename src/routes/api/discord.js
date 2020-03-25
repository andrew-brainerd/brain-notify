const Joi = require('joi');
const discord = require('express').Router();
const { validator } = require('../../utils/validator');
const status = require('../../utils/statusMessages');
const { sendMessage } = require('../../utils/discord');
const { getAnorakBoardColumn } = require('../../utils/glo');

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

discord.post('/anorak-release', validator.body(postReleaseBody), async (req, res) => {
  const { body: { data } } = req;
  const token = process.env.ANORAK_DISCORD_BOT_TOKEN;
  const channel = process.env.ANORAK_DISCORD_CHANNEL;
  const message = `Released ${data.app.name} version ${data.release.version} [${data.user.email}]`;

  await sendMessage(token, channel, message);

  return status.created(res, { message });
});

const postBoardUpdateBody = Joi.object({
  action: Joi.string().required(),
  board: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required()
  }).required(),
  card: Joi.object(),
  sender: Joi.object().required(),
  column: Joi.object(),
  sequence: Joi.number()
});

discord.post('/anorak-board-update', validator.body(postBoardUpdateBody), async (req, res) => {
  const { body: { action, board, card, sender } } = req;
  const token = process.env.ANORAK_DISCORD_BOT_TOKEN;
  const channel = process.env.ANORAK_DISCORD_CHANNEL;

  const boardUrl = `https://app.gitkraken.com/glo/board/${board.id}`;
  let message = `\n\n${board.name} has updates\n${boardUrl}\n`;

  if (action === 'moved_column') {
    message += `[${card.name}] moved to ${getAnorakBoardColumn(card.column_id)} by ${sender.name}\n\n`;
  }

  console.log(req.body);

  await sendMessage(token, channel, message);

  return status.created(res, { boardUpdate: req.body, message });
});

module.exports = discord;
