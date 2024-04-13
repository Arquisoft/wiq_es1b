// src/components/Home.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Typography, Button, Stack} from '@mui/material';
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

  function handleStartGame(category) {
    // Lógica para iniciar la partida
    navigate("/getQuestion", {state: {username, createdAt, category, selectedNumQuestions, selectedTimer}});
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
        <Button variant="contained" color="primary" size="large" onClick={() => handleStartGame("science")}>
          New Science Game
        </Button>
      </Stack>
    </Container>
  );
};

export default Home;
