const Like = require('../models/Like');

exports.likeCampaign = async (req, res) => {
  const { userId, campaignId } = req.body;
  try {
    const existing = await Like.findOne({ userId, campaignId });
    if (existing) return res.status(400).json({ message: 'Already liked' });

    const like = new Like({ userId, campaignId });
    await like.save();
    res.status(201).json({ message: 'Liked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Like failed' });
  }
};
