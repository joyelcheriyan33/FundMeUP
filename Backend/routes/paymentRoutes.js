const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { saveDonation } = require('../controller/paymentController');

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  if (amount < 5000) {
  return res.status(400).json({ error: 'Minimum amount is ₹50' });
}
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      payment_method_types: ['card'],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
});
router.post('/record-donation', saveDonation);

module.exports = router;
