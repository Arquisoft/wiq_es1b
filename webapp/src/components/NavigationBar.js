// src/components/NavigationBar.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Tabs, Tab, Tooltip, styled } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const StyledTab = styled(Tab)(({ theme }) => ({
  color: 'white',
  fontWeight: 'bold',
  borderBottom: '3px solid transparent',
  '&:hover': {
    borderBottomColor: theme.palette.primary.main,
  },
  '&.Mui-selected': {
    borderBottomColor: theme.palette.primary.main,
  },
}));

const NavigationBar = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || {};
  const { createdAt } = location.state || {};
  const { selectedNumQuestions } = location.state || {};
  const { selectedTimer } = location.state || {};

  const showHome = () => {
    if (username !== undefined) {
      deleteTempQuestions();
      navigate("/home", { state: { username, createdAt, selectedNumQuestions, selectedTimer} });
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
    if (username !== undefined) {
      deleteTempQuestions();
      navigate("/help", { state: { username, createdAt } });
    }
  };

  const showAboutUs = () => {
    if (username !== undefined) {
      deleteTempQuestions();
      navigate("/aboutUs", { state: { username, createdAt } });
    }
  };

  const showApiDoc = () => {
    window.location.href = 'http://20.26.114.153:8000/api-doc/'; //NOSONAR
  };

  const showSettings = () => {
    if (username !== undefined) {
      deleteTempQuestions();
      navigate("/settings", { state: { username, createdAt } });
    }
  };

  const logOut = () => {
    localStorage.removeItem('username');
    navigate('/');
  }

  return (
    <AppBar position="absolute">
      <Tabs
        value={false}
        aria-label="navigation tabs"
        variant="fullWidth"
      >
        <StyledTab label="Home" onClick={showHome} />
        <StyledTab label="Record" onClick={showRecord} />
        <StyledTab label="Help" onClick={showHelp} />
        <StyledTab label="About Us" onClick={showAboutUs} />
        <StyledTab label="API Doc" onClick={showApiDoc} />
        <StyledTab aria-label="Settings" 
          icon={<Tooltip title="Settings">
              <SettingsIcon />
            </Tooltip>} 
          onClick={showSettings} />
        <StyledTab aria-label="Log out" 
          icon={<Tooltip title="Log out">
              <LogoutIcon />
            </Tooltip>} 
          onClick={logOut} />
      </Tabs>
    </AppBar>
  );
};

export default NavigationBar;
