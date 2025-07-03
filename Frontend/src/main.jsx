import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51RfN4ICxZk9OCRIt83c35OtTgOaUiFnMgkpx1iMyE4GcqJm5oBTNYgfvXihFf9twuRkC67uvmtrtyOD5VZP7rFs600pKhQN51d');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </BrowserRouter>
  </StrictMode>
);
