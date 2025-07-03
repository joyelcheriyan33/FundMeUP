const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
}, { timestamps: true });

likeSchema.index({ userId: 1, campaignId: 1 }, { unique: true }); 

module.exports = mongoose.model('Like', likeSchema);
