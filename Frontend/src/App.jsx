import React from 'react';
import { useEffect } from 'react';
import {  Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Registration';
import Campaign from './components/campaign';
import AdminPanel from './components/AdminPanel';


function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  return (
      <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/campaign" element={<Campaign />}/>
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      </>
  );
}

export default App;
