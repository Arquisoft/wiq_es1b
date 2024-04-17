// src/components/NavigationBar.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Tabs, Tab, Tooltip, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const NavigationBar = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || {};
  const { createdAt } = location.state || {};
  const { selectedNumQuestions } = location.state || {};
  const { selectedTimer } = location.state || {};

  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const tabStyle = {
    color: 'white',
    fontWeight: 'bold'
  };

  const menuStyle = {
    padding: 0,
  };

  const menuItemStyle = {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#1976d2',
  };

  return (
    <div>
      <AppBar position="absolute">
        <Tabs
          value={false}
          aria-label="navigation tabs"
          variant="fullWidth"
        >
          <Tab label="Home"
            sx={tabStyle} 
            onClick={showHome} />
          <Tab label="Help"
            sx={tabStyle} 
            onClick={showHelp} />
          <Tab label="About Us"
            sx={tabStyle} 
            onClick={showAboutUs} />   
          <Tab aria-label="Settings"
            icon={<Tooltip title="Settings">
                    <SettingsIcon sx={tabStyle} />
                  </Tooltip>}     
            onClick={openMenu} />
          <Tab aria-label="Record"
            icon={<Tooltip title="Personal record">
                    <AccountCircle sx={tabStyle} />
                  </Tooltip>}     
            onClick={showRecord} />
          <Tab aria-label="Log out"
            icon={<Tooltip title="Log out">
                    <LogoutIcon sx={tabStyle} />
                  </Tooltip>}     
            onClick={logOut} />
        </Tabs>
      </AppBar>
      <Menu aria-label="Menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        MenuListProps={{
          sx: menuStyle
        }}
      >
        <MenuItem aria-label="Game Settings"
          sx={menuItemStyle}
          onClick={showSettings} >
          Game settings
        </MenuItem>
        <MenuItem aria-label="API DOC"
          sx={menuItemStyle}
          onClick={showApiDoc} >
          API DOC
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavigationBar;
