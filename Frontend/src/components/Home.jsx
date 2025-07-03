import React, { useEffect, useState } from 'react';
// Fetch campaign stats (total donations and likes)
const fetchCampaignStats = async () => {
  const res = await axios.get('http://localhost:3000/api/campaigns/stats/all');
  return res.data;
};
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';
import StripeCheckout from './stripeCheckout';

export default function Home() {
  const [message, setMessage] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [stats, setStats] = useState({ donationMap: {}, likeMap: {} });

  // Protected welcome message
  useEffect(() => {
    const fetchProtected = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setMessage('Join a global community funding change and innovation.');
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/api/protected-route', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(res.data.message);
      } catch (err) {
        console.error('Token error:', err.response?.data?.message);
        setMessage('Join a global community funding change and innovation.');
        localStorage.removeItem('token');
      }
    };

    fetchProtected();
  }, []);

  // Fetch all campaigns and stats every 1 second
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [campaignRes, statsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/campaigns'),
          fetchCampaignStats()
        ]);
        setCampaigns(campaignRes.data);
        setStats(statsRes);
      } catch (error) {
        console.error('Error fetching campaigns or stats:', error);
      }
    };
    fetchAll();
    const interval = setInterval(fetchAll, 1000);
    return () => clearInterval(interval);
  }, []);

  // Like Handler
  const handleLike = async (campaignId) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    try {
      await axios.post('http://localhost:3000/api/likes/like', {
      userId: user._id,
      campaignId
    });
      const updated = campaigns.map((c) =>
        c._id === campaignId ? { ...c, likes: (c.likes || 0) + 1 } : c
      );
      setCampaigns(updated);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to like');
    }
  };

  return (
    <>
      <header className="hero">
        <div className="hero-text">
          <h2>Empower Ideas, Fund the Future</h2>
          <p>{message}</p>
          <Link to="#campaigns" className="btn">Join a Campaign</Link>
        </div>
      </header>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <h2>Why CrowdFundX?</h2>
          <p>
            We connect people with powerful ideas to those who can help fund them.
            Whether it's education, innovation, or art — we make it possible.
          </p>
        </div>
      </section>

      {/* Campaigns */}
      <section className="campaigns" id="campaigns">
        <div className="container">
          <h2>Featured Campaigns</h2>
          <div className="cards">
            {campaigns.length === 0 ? (
              <p>No campaigns yet.</p>
            ) : (
              campaigns.map((campaign) => (
                <div className="card" key={campaign._id}>
                  <img src={campaign.imageUrl || '/default.jpg'} alt={campaign.title} />
                  <h3>{campaign.title}</h3>
                  <p>{campaign.description.slice(0, 100)}...</p>
                  <p><strong>Goal:</strong> ₹{campaign.goalAmount}</p>
                  <p><strong>Deadline:</strong> {new Date(campaign.deadline).toLocaleDateString()}</p>

                  <p><strong>Total Donations:</strong> ₹{stats.donationMap[campaign._id] || 0}</p>
                  <div className="card-actions">
                    <button
                      className="btn donate-btn"
                      onClick={() => {
                        setSelectedCampaign(campaign);
                        setShowModal(true);
                      }}
                    >
                      💰 Donate
                    </button>
                    <button className="btn like-btn" onClick={() => handleLike(campaign._id)}>
                      ❤️ Like {stats.likeMap[campaign._id] || 0}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedCampaign && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Donate to {selectedCampaign.title}</h3>
              <StripeCheckout
                amount={selectedCampaign.goalAmount * 100}
                campaignId={selectedCampaign._id}
              />
              <button className="btn cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>

      <footer className="footer">
        <div className="container">
          <p>© 2025 CrowdFundX | Follow us:
            <a href="#"> Facebook</a> · 
            <a href="#"> Twitter</a> · 
            <a href="#"> Instagram</a>
          </p>
        </div>
      </footer>
    </>
  );
}
