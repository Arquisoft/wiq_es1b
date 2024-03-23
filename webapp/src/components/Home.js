// src/components/Home.js
import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Typography, Button, Stack } from '@mui/material';
import './stylesheets/home.css';
import logo from '../logo.svg';

const Home = () => {
  
  const navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || {};
  const { createdAt } = location.state || {};

  function handleStartGame() {
    // Lógica para iniciar la partida
    navigate("/getQuestion", {state: {username, createdAt }});
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: 10 }}>
      <div className='logoContainer'>
        <img src={logo} alt="Logo" className="logo" style={{ width: '100px', position: 'relative', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
      <Typography component="h2" variant="h5" sx={{ textAlign: 'center' }}>
        Hello {username}!
      </Typography>
      <Typography component="h2" variant="h5" sx={{ textAlign: 'center' }}>
        Your account was created on {formatDate(createdAt)}!
      </Typography>
      <Typography component="p" variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
        Here you can start a new game or check your record.
      </Typography>
      {/*<Typography component="p" variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
        Your account was created on {new Date(createdAt).toLocaleDateString()}.
      </Typography>*/}
      <Stack spacing={2} sx={{ marginTop: 4 }}>        
        <Button variant="contained" color="primary" size="large" onClick={handleStartGame}>
          New Game
        </Button>
      </Stack>
    </Container>
  );
};

export default Home;
