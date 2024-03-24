// src/components/NavigationBar.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@mui/material';

const NavigationBar = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || {};
  const { createdAt } = location.state || {};

  const showHome = () => {
    if (username != undefined) {
      navigate("/home", {state: {username, createdAt }});
    }
  };

  const startGame = () => {
    if (username != undefined) {
      navigate("/getQuestion", {state: {username, createdAt }});
    }
  };

  const showRecord = () => {
    if (username != undefined) {
      navigate("/record", {state: {username, createdAt }});
    }
  };

  const showAboutUs = () => {
    navigate("/aboutUs", {state: {username, createdAt }});
  };

  return (
    <AppBar position="absolute">
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
