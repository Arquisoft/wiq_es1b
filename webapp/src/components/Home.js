// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Typography, Button, Stack, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import './stylesheets/home.css';
import logo from '../logo.svg';

const Home = () => {
  
  const navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || {};
  const { createdAt } = location.state || {};
  const selectedTimer = localStorage.getItem('selectedTimer');
  const selectedNumQuestions = localStorage.getItem('selectedNumQuestions');

  useEffect(() => { 
    const user = localStorage.getItem('username');
    if (user === null) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleStartGame(category) {
    handleClose();
    // Lógica para iniciar la partida
    navigate("/getQuestion", {state: {username, createdAt, category, selectedNumQuestions, selectedTimer}});
  };

  function handleHumanCalculator(){
    handleClose();
    navigate("/humanCalculator", {state: {username, createdAt, selectedNumQuestions, selectedTimer}});
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const [openD, setOpenD] = useState(false);

  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
    handleStartGame("art");
  };

  const [openHC, setOpenHC] = useState(false);
  const handleClickOpenHC = () => {
    setOpenHC(true);
  };
  const handleCloseHC = () => {
    setOpenHC(false);
    handleHumanCalculator()
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
      <Stack spacing={2} sx={{ marginTop: 4 }}>
        <Button variant="contained" color="primary" size="large" onClick={() => handleStartGame("todo")}>
          New Full Random Game
        </Button>
        <Button variant="contained" color="primary" size="large" onClick={() => handleClickOpenD()}>
          New Art Gallery Game
        </Button>
        <Dialog open={openD} onClose={handleCloseD} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"How to Play"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Guess the artwork of the artist.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseD} color="primary" autoFocus>
              Start Game
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant="contained" color="primary" size="large" onClick={() => handleClickOpenHC()}>
          New Human Calculator Game
        </Button>
        <Dialog open={openHC} onClose={handleCloseHC} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"How to Play"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Solve the math problems as fast as you can.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseHC} color="primary" autoFocus>
              Start Game
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant="contained" color="primary" size="large" onClick={handleClick}>
          Play by Category
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleStartGame("image")}>New Images Game</MenuItem>
          <MenuItem onClick={() => handleStartGame("geography")}>New Geography Game</MenuItem>
          <MenuItem onClick={() => handleStartGame("science")}>New Science Game</MenuItem>
        </Menu>
      </Stack>
    </Container>
  );
};

export default Home;
