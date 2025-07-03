import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user?.isAdmin) {
      navigate('/'); 
    }
  }, []);

  const handleCampaignSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="container mt-5">
      <h2>Admin Panel - Create Campaign</h2>
      <form onSubmit={handleCampaignSubmit}>
        <input type="text" placeholder="Campaign Title" className="form-control mb-3" required />
        <textarea placeholder="Description" className="form-control mb-3" required />
        <button className="btn btn-primary">Submit Campaign</button>
      </form>
    </div>
  );
};

export default AdminPanel;
