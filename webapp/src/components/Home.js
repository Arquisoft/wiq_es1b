// src/components/Home.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Typography, Button, Stack, Menu, MenuItem, Fade, Tooltip} from '@mui/material';
import './stylesheets/home.css';
import logo from '../logo.svg';

const Home = () => {
  
  const navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || {};
  const { createdAt } = location.state || {};

  //to manage the number of questions
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNumQuestions, setSelectedNumQuestions] = useState(10);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemQuestionClick = (numQuestions) => {
    setSelectedNumQuestions(numQuestions);
    handleClose();
  };

  //to manage the timer
  const [anchorElT, setAnchorElT] = useState(null);
  const [selectedTimer, setSelectedTimer] = useState(15);
  const openT = Boolean(anchorElT);
  const handleClickT = (event) => {
    setAnchorElT(event.currentTarget);
  };
  const handleCloseT = () => {
    setAnchorElT(null);
  };
  const handleMenuItemTimeClick = (time) => {
    setSelectedTimer(time);
    handleClose();
  };

  //to manage the configuration
  const [showConfig, setShowConfig] = useState(false);

  function handleStartGame(category) {
    // Lógica para iniciar la partida
    navigate("/getQuestion", {state: {username, createdAt, category}});
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
      
      <div className='logoContainer'>
        <img src={logo} alt="Logo" className="logo" style={{ width: '100px', position: 'relative', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
      <Typography component="h2" variant="h4" sx={{ textAlign: 'center' }}>
        Hello {username}!
      </Typography>
      <Typography component="h3" variant="h5" sx={{ textAlign: 'center', marginTop: 2 }}>
        Here you can start a new game!
      </Typography>
      <Typography component="p" variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
        Your account was created on {formatDate(createdAt)}.
      </Typography>
      <Button variant="contained" color="primary" size="large" onClick={() => setShowConfig(!showConfig)}>
        Configuration of the game
      </Button>
      {showConfig && (
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
      )}
      <Stack spacing={2} sx={{ marginTop: 4 }}>        
        <Button variant="contained" color="primary" size="large" onClick={() => handleStartGame("todo")}>
          New Full Random Game
        </Button>
        <Button variant="contained" color="primary" size="large" onClick={() => handleStartGame("image")}>
          New Images Game
        </Button>
        <Button variant="contained" color="primary" size="large" onClick={() => handleStartGame("geography")}>
          New Geography Game
        </Button>
      </Stack>
    </Container>
  );
};

export default Home;
