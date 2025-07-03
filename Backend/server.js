const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/userControllerRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const likeRoutes = require('./routes/likeRoutes');

const app = express();
// Connect to MongoDB
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', protectedRoutes);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/payments', paymentRoutes); 
app.use('/api/likes', likeRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to backend');
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
