// src/components/AboutUs.js
import React, { useEffect, useState } from 'react';
import { Container, Button, Tooltip, Menu, MenuItem, Fade, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user === null) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  //to manage the timer
  const [anchorElT, setAnchorElT] = useState(null);
  const [selectedTimer, setSelectedTimer] = useState(() => {
    const savedTimer = localStorage.getItem('selectedTimer');
    return savedTimer ? Number(savedTimer) : 15;
  });
  const openT = Boolean(anchorElT);
  const handleClickT = (event) => {
    setAnchorElT(event.currentTarget);
  };
  const handleCloseT = () => {
    setAnchorElT(null);
  };
  const handleMenuItemTimeClick = (time) => {
    setSelectedTimer(time);
    localStorage.setItem('selectedTimer', time);
    handleCloseT();
  };

  //to manage the number of questions
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNumQuestions, setSelectedNumQuestions] = useState(() => {
    const savedNumQuestions = localStorage.getItem('selectedNumQuestions');
    return savedNumQuestions ? Number(savedNumQuestions) : 10;
  });
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemQuestionClick = (numQuestions) => {
    setSelectedNumQuestions(numQuestions);
    localStorage.setItem('selectedNumQuestions', numQuestions);
    handleClose();
  };

  return(
    <Container component="main" maxWidth="md" sx={{ margin: 8 }}>
      <Typography variant="h4" component="h1" sx={{ paddingBottom: '2em' }}>
        Configuration
      </Typography>
      <div>
          <div style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>
          <Tooltip title="button to change the number of questions of the game">
            <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              style={{ backgroundColor: "white", color: 'black', width: '27em' }}
            >
              Press to change nº of questions: {selectedNumQuestions}.
            </Button>
          </Tooltip>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => handleMenuItemQuestionClick(5)}>5</MenuItem>
            <MenuItem onClick={() => handleMenuItemQuestionClick(10)}>10</MenuItem>
            <MenuItem onClick={() => handleMenuItemQuestionClick(15)}>15</MenuItem>
          </Menu>
        </div>
        <div >
          <Tooltip title="button to change the time limit for each question of the game">
            <Button
              id="fade-button"
              aria-controls={openT ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openT ? 'true' : undefined}
              onClick={handleClickT}
              style={{ backgroundColor: "white", color: 'black', width: '27em' }}
            >
              Press to change the time limit: {selectedTimer}.
            </Button>
          </Tooltip>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorElT}
            open={openT}
            onClose={handleCloseT}
            TransitionComponent={Fade}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => handleMenuItemTimeClick(10)}>10</MenuItem>
            <MenuItem onClick={() => handleMenuItemTimeClick(15)}>15</MenuItem>
            <MenuItem onClick={() => handleMenuItemTimeClick(20)}>20</MenuItem>
          </Menu>
        </div>
      </div>
    </Container>
  );
};

export default SettingsPage;
