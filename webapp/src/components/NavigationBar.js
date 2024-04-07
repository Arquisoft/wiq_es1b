// src/components/NavigationBar.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@mui/material';
import axios from 'axios';
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const NavigationBar = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || {};
  const { createdAt } = location.state || {};

  const showHome = () => {
    if (username !== undefined) {
      deleteTempQuestions();
      navigate("/home", { state: { username, createdAt } });
    }
  };

  const showRecord = () => {
    if (username !== undefined) {
      deleteTempQuestions();
      navigate("/record", { state: { username, createdAt } });
    }
  };

  const deleteTempQuestions = async () => {
    await axios.post(`${apiEndpoint}/deleteTempQuestions`, { username });

  }

  const showHelp = () => {
    deleteTempQuestions();
    navigate("/help", { state: { username, createdAt } });
  };

  const showAboutUs = () => {
    deleteTempQuestions();
    navigate("/aboutUs", { state: { username, createdAt } });
  };

  const showApiDoc = () => {
    window.location.href = 'http://20.26.114.153:8000/api-doc/';
  };

  return (
    <AppBar position="fixed">
      <Tabs
        value={false}
        aria-label="navigation tabs"
        variant="fullWidth"
      >
        <Tab label="Home"
          sx={{ color: 'white', fontWeight: 'bold' }}
          onClick={showHome} />
        <Tab label="Record"
          sx={{ color: 'white', fontWeight: 'bold' }}
          onClick={showRecord} />
        <Tab label="Help"
          sx={{ color: 'white', fontWeight: 'bold' }}
          onClick={showHelp} />
        <Tab label="About Us"
          sx={{ color: 'white', fontWeight: 'bold' }}
          onClick={showAboutUs} />
        <Tab label="API Doc"
          sx={{ color: 'white', fontWeight: 'bold' }}
          onClick={showApiDoc} />
      </Tabs>
    </AppBar>
  );
};

export default NavigationBar;
