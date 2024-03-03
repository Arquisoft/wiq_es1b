// src/components/Home.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar, Stack } from '@mui/material';
import logo from '../logo.svg';

const Home = ({ username, createdAt }) => {
  const [error, setError] = useState('');

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
  /*
  const loginUser = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/home`);

      // Extract data from the response
      const { createdAt: userCreatedAt } = response.data;
    } catch (error) {
      setError(error.response.data.error);
    }
  };
*/
  const handleStartGame = () => {
    // Lógica para iniciar la partida
    console.log('Iniciar partida...');
  };

  const handleShowHistory = () => {
    // Lógica para mostrar el historial de partidas
    console.log('Mostrar historial de partidas...');
  };

  return (
<<<<<<< HEAD
    <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
        Welcome to the 2024 edition of the Software Architecture course
      </Typography>
      <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
        Hello {username}!
      </Typography>
      <Typography component="p" variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
        Your account was created on {new Date(createdAt).toLocaleDateString()}.
      </Typography>
=======
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
        Welcome to the 2024 edition of the Software Architecture course
      </Typography>
>>>>>>> 5dcfa15de9688c14df765de8684690107864487b
      <img src={logo} alt="Logo" style={{ width: '100px', position: 'absolute', top: '20px', left: '20px' }} />
      <Stack spacing={2} sx={{ marginTop: 4 }}>
        <Button variant="contained" color="primary" size="large" onClick={handleStartGame}>
          Nuevo Juego
        </Button>
        <Button variant="contained" color="secondary" size="large" onClick={handleShowHistory}>
          Historial
        </Button>
      </Stack>
    </Container>
  );
};

export default Home;
