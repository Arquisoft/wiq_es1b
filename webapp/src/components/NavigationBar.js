// src/components/NavigationBar.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Tabs, Tab, Tooltip, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import IconWIQ from '../favicon2.ico';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const NavigationBar = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || {};
  const { createdAt } = location.state || {};
  const { selectedNumQuestions } = location.state || {};
  const { selectedTimer } = location.state || {};

  const [anchorElInfoMenu, setAnchorElInfoMenu] = React.useState(null);

  const deleteTempQuestions = async () => {
    await axios.post(`${apiEndpoint}/deleteTempQuestions`, { username });
  };

  const showHome = () => {
    if (username !== undefined) {
      deleteTempQuestions();
      navigate("/home", { state: { username, createdAt, selectedNumQuestions, selectedTimer} });
    }
  };

  const showSettings = () => {
    if (username !== undefined) {
      deleteTempQuestions();
      navigate("/settings", { state: { username, createdAt } });
    }
  };

  const showRecord = () => {
    if (username !== undefined) {
      deleteTempQuestions();
      navigate("/record", { state: { username, createdAt } });
    }
  };

  const showRanking = () => {
    if (username !== undefined) {
      deleteTempQuestions();
      navigate("/ranking", { state: { username, createdAt } });
    }
  };

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

  const logOut = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const openInfoMenu = (event) => {
    setAnchorElInfoMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorElInfoMenu(null);
  };

  const tabsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  
  const tabStyle = {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#209cee',
    fontSize: 26,
    flex: '0 0 auto',
    paddingTop: 0,
    paddingBottom: 0,
    minWidth: 0,
  };

  const menuStyle = {
    padding: 0,
  };

  const menuItemStyle = {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#209cee',
    '&:hover': {
      backgroundColor: '#209cee',
    },
  };

  return (
    <div>
      <AppBar position="absolute">
        <Tabs aria-label="navigation tabs"
          value={false}
          variant="fullWidth"
          sx={tabsStyle}
        >
          <Tab aria-label="Logo"
            data-testid="logo-tab"
            icon={<Tooltip title="Home">
                    <img src={IconWIQ} alt="Icono" />
                  </Tooltip>}   
            sx={tabStyle}              
            onClick={showHome} />
          <Tab label="WIQ"
            data-testid="wiq-tab"
            sx={tabStyle}
            onClick={showHome} />
          <div style={{ flex: 5, background: '#209cee' }} />
          <Tab aria-label="Settings"
            data-testid="settings-tab"
            icon={<Tooltip title="Settings">
                    <SettingsIcon sx={tabStyle} />
                  </Tooltip>}    
            sx={tabStyle}
            onClick={showSettings} />
          <Tab aria-label="Record"
            data-testid="record-tab"
            icon={<Tooltip title="Personal record">
                    <AccountCircle sx={tabStyle} />
                  </Tooltip>}  
            sx={tabStyle}
            onClick={showRecord} />
          <Tab aria-label="Ranking"
            data-testid="ranking-tab"    
            icon={<Tooltip title="Ranking">
                    <LeaderboardIcon sx={tabStyle} />
                  </Tooltip>}  
            sx={tabStyle}
            onClick={showRanking} />
          <Tab aria-label="Info"          
            data-testid="info-tab"          
            icon={<Tooltip title="Info">
                    <HelpIcon sx={tabStyle} />
                  </Tooltip>}
            sx={tabStyle}
            onClick={openInfoMenu} />
          <Tab aria-label="Log out"
            data-testid="logout-tab"
            icon={<Tooltip title="Log out">
                    <LogoutIcon sx={tabStyle} />
                  </Tooltip>}  
            sx={tabStyle}
            onClick={logOut} />
        </Tabs>
      </AppBar>
      <Menu aria-label="Info menu"
        anchorEl={anchorElInfoMenu}
        open={Boolean(anchorElInfoMenu)}
        onClose={closeMenu}
        MenuListProps={{
          sx: menuStyle
        }}
      >
       <MenuItem aria-label="Help"
          data-testid="help-item"
          sx={menuItemStyle}
          onClick={showHelp} >
          Help
        </MenuItem>
        <MenuItem aria-label="About us"
          data-testid="about-us-item"
          sx={menuItemStyle}
          onClick={showAboutUs} >
          About us
        </MenuItem>
        <MenuItem aria-label="API DOC"
          data-testid="api-doc-item"
          sx={menuItemStyle}
          onClick={showApiDoc} >
          API DOC
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavigationBar;
