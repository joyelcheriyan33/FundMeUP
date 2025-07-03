const express = require('express');
const router = express.Router();
const { likeCampaign } = require('../controller/likeController');

router.post('/like', likeCampaign);

module.exports = router;
