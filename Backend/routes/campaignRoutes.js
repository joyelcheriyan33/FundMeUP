const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const { getCampaignStats } = require('../controller/campaignStatsController');

router.get('/stats/all', getCampaignStats);


router.post('/', async (req, res) => {
  try {
    const newCampaign = new Campaign(req.body);
    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create campaign', error: err.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching campaigns' });
  }
});
router.patch('/:id/like', async (req, res) => {
  const userId = req.body.userId;

  try {
    const campaign = await Campaign.findById(req.params.id);

    if (campaign.likedBy.includes(userId)) {
      return res.status(400).json({ message: 'Already liked' });
    }

    campaign.likes += 1;
    campaign.likedBy.push(userId);
    await campaign.save();

    res.json({ message: 'Liked!', likes: campaign.likes });
  } catch (err) {
    res.status(500).json({ message: 'Failed to like campaign' });
  }
});

module.exports = router;
