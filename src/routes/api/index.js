const router = require('express').Router();
const version = process.env.API_VERSION;

router.get('/', (req, res) => {
  res.send({
    message: `Welcome to the Brainerd Notification API v${version}!`
  });
});

router.use('/discord', require('./discord'));

module.exports = router;
