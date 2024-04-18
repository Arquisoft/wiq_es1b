// src/components/NavigationBar.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Tabs, Tab, Tooltip, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import IconWIQ from '../favicon2.ico';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const NavigationBar = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || {};
  const { createdAt } = location.state || {};
  const { selectedNumQuestions } = location.state || {};
  const { selectedTimer } = location.state || {};

  const [anchorElSettingsMenu, setAnchorElSettingsMenu] = React.useState(null);
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

  const showApiDoc = () => {
    window.location.href = 'http://20.26.114.153:8000/api-doc/'; //NOSONAR
  };

  const showRecord = () => {
    if (username !== undefined) {
      deleteTempQuestions();
      navigate("/record", { state: { username, createdAt } });
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

  const logOut = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const openSettingsMenu = (event) => {
    setAnchorElSettingsMenu(event.currentTarget);
  };

  const openInfoMenu = (event) => {
    setAnchorElInfoMenu(event.currentTarget);
  };

  const closeMenus = () => {
    setAnchorElSettingsMenu(null);
    setAnchorElInfoMenu(null);
  };

  const tabsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  
  const tabStyle = {
    color: 'white',
    fontWeight: 'bold',
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
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#1976d2',
    },
  };

  return (
    <div>
      <AppBar position="absolute">
        <Tabs
          value={false}
          aria-label="navigation tabs"
          variant="fullWidth"
          sx={tabsStyle}
        >
          <Tab aria-label="WIQ"
              sx={tabStyle}
              icon={<Tooltip title="Home">
                      <img src={IconWIQ} alt="Icono" />
                    </Tooltip>}   
              onClick={showHome} />
          <div style={{ flex: 5 }} />
          <Tab aria-label="Settings"
            sx={tabStyle}
            icon={<Tooltip title="Settings">
                    <SettingsIcon sx={tabStyle} />
                  </Tooltip>}
            onClick={openSettingsMenu} />
          <Tab aria-label="Record"
            sx={tabStyle}
            icon={<Tooltip title="Personal record">
                    <AccountCircle sx={tabStyle} />
                  </Tooltip>}
            onClick={showRecord} />
          <Tab aria-label="Info"
            sx={tabStyle}
            icon={<Tooltip title="Info">
                    <HelpIcon sx={tabStyle} />
                  </Tooltip>}
            onClick={openInfoMenu} />
          <Tab aria-label="Log out"
            sx={tabStyle}
            icon={<Tooltip title="Log out">
                    <LogoutIcon sx={tabStyle} />
                  </Tooltip>}
            onClick={logOut} />
        </Tabs>
      </AppBar>
      <Menu aria-label="Settings menu"
        anchorEl={anchorElSettingsMenu}
        open={Boolean(anchorElSettingsMenu)}
        onClose={closeMenus}
        MenuListProps={{
          sx: menuStyle
        }}
      >
        <MenuItem aria-label="Game settings"
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
      <Menu aria-label="Help menu"
        anchorEl={anchorElInfoMenu}
        open={Boolean(anchorElInfoMenu)}
        onClose={closeMenus}
        MenuListProps={{
          sx: menuStyle
        }}
      >
       <MenuItem aria-label="Help"
          sx={menuItemStyle}
          onClick={showHelp} >
          Help
        </MenuItem>
        <MenuItem aria-label="About us"
          sx={menuItemStyle}
          onClick={showAboutUs} >
          About us
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavigationBar;
