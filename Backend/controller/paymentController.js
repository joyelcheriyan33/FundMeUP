const Donation = require('../models/Donation');

exports.saveDonation = async (req, res) => {
  try {
    const { userId, campaignId, amount } = req.body;

    const donation = new Donation({
      userId,
      campaignId,
      amount,
      date: new Date(),
    });

    await donation.save();

    res.status(200).json({ message: 'Donation saved successfully' });
  } catch (err) {
    console.error('Donation save error:', err);
    res.status(500).json({ error: 'Failed to record donation' });
  }
};
