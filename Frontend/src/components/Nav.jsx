
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './images/fund-me-up-high-resolution-logo.png';

export default function Nav() {
  const navigate = useNavigate();

  
  const token = sessionStorage.getItem('authToken');
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-3" to="/">
          <img src={logo} alt="FundMeUp Logo" width="60" height="60" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }} />
          <span style={{ fontFamily: 'Poppins, Segoe UI, sans-serif', color: '#4f46e5', letterSpacing: '2px', fontWeight: 700 }}>FundMeUp</span>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2 align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#campaigns">Campaigns</a>
            </li>

            {user?.isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/campaign">Admin Panel</Link>
              </li>
            )}

            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light ms-lg-3" to="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">👋 Welcome, {user?.name}</span>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-warning ms-lg-2">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
