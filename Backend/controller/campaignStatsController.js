const Donation = require('../models/Donation');
const Like = require('../models/Like');


exports.getCampaignStats = async (req, res) => {
  try {
   
    const donations = await Donation.aggregate([
      { $group: { _id: '$campaignId', totalDonation: { $sum: '$amount' } } }
    ]);
    
    const likes = await Like.aggregate([
      { $group: { _id: '$campaignId', totalLikes: { $sum: 1 } } }
    ]);
    
    const donationMap = Object.fromEntries(donations.map(d => [String(d._id), d.totalDonation]));
    const likeMap = Object.fromEntries(likes.map(l => [String(l._id), l.totalLikes]));
    res.json({ donationMap, likeMap });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch campaign stats' });
  }
};
