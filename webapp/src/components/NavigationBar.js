// src/components/AboutUs.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@mui/material';

const NavigationBar = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || {};
  const { createdAt } = location.state || {};

  const showHome = () => {
    navigate("/home", {state: {username, createdAt}});
  };

  const startGame = () => {
    navigate("/getQuestion", {state: {username, createdAt}});
  };

  const showRecord = () => {
    console.log("Navigation Bar: " + username)
    navigate("/record", {state: {username, createdAt}});
  };

  const showAboutUs = () => {
    navigate("/aboutUs", {state: {username, createdAt}});
  };

  return (
    <AppBar position="static">
      <Tabs
        value={false}
        aria-label="navigation tabs"
        variant="fullWidth"
      >
        <Tab label="Home" 
          sx={{ color: 'white', fontWeight: 'bold' }} 
          onClick={showHome} />
        <Tab label="Game" 
          sx={{ color: 'white', fontWeight: 'bold' }} 
          onClick={startGame} />
        <Tab label="Record" 
          sx={{ color: 'white', fontWeight: 'bold' }} 
          onClick={showRecord} />
        <Tab label="About Us" 
          sx={{ color: 'white', fontWeight: 'bold' }} 
          onClick={showAboutUs} />
      </Tabs>
    </AppBar>
  );
};

export default NavigationBar;
