import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const MIN_DONATION = 50;

export default function StripeCheckout({ campaignId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [donationAmount, setDonationAmount] = useState(MIN_DONATION * 100);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (donationAmount >= MIN_DONATION * 100) {
      axios
        .post('http://localhost:3000/api/payments/create-payment-intent', { amount: donationAmount })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => {
          console.error('Payment intent error:', err);
          setMessage('❌ Failed to initialize payment.');
        });
    } else {
      setClientSecret('');
    }
  }, [donationAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user || !user._id) {
      setMessage('⚠️ Please log in to complete your donation.');
      return;
    }

    if (!stripe || !elements || !clientSecret) {
      setMessage('Stripe is not ready. Please try again later.');
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setMessage(`❌ ${result.error.message}`);
    } else if (result.paymentIntent.status === 'succeeded') {
      setMessage('✅ Payment successful!');
      try {
        await axios.post('http://localhost:3000/api/payments/record-donation', {
          userId: user._id,
          campaignId,
          amount: Number(donationAmount) / 100, 
        });
      } catch (err) {
        console.error('Donation record error:', err.response?.data || err.message || err);
        setMessage('⚠️ Payment succeeded, but failed to record donation.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '10px' }}>
      <label>
        Enter amount (₹):
        <input
          type="number"
          min={MIN_DONATION}
          value={donationAmount ? String(donationAmount / 100) : ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || isNaN(Number(value))) {
              setDonationAmount('');
            } else {
              setDonationAmount(Number(value) * 100);
            }
          }}
          required
        />
      </label>

      <div style={{ margin: '10px 0' }}>
        <CardElement />
      </div>

      <button type="submit" disabled={!stripe || !clientSecret}>
        Pay ₹{donationAmount / 100}
      </button>

      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </form>
  );
}
