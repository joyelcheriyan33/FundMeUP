import React, { useState } from 'react';
import './campaign.css'; 

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalAmount: '',
    deadline: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:3000/api/campaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    alert('Campaign created successfully!');
    setFormData({ title: '', description: '', goalAmount: '', deadline: '', imageUrl: '' });
  } catch (error) {
    alert('Error: ' + error.message);
  }
};

  return (
    <div className="campaign-container">
      <form className="campaign-form" onSubmit={handleSubmit}>
        <h2>Create a New Campaign</h2>

        <label>Campaign Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Help Build a School"
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write about your campaign..."
          required
        ></textarea>

        <div className="form-row">
          <div>
            <label>Goal Amount (₹)</label>
            <input
              type="number"
              name="goalAmount"
              value={formData.goalAmount}
              onChange={handleChange}
              placeholder="e.g., 50000"
              min="100"
              required
            />
          </div>

          <div>
            <label>Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label>Image URL</label>
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />

        <button type="submit">🚀 Launch Campaign</button>
      </form>
    </div>
  );
};

export default CreateCampaign;
