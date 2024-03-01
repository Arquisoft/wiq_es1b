// src/components/Home.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar, Stack } from '@mui/material';

const Home = () => {
  const [error, setError] = useState('');

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const loginUser = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/home`);

      // Extract data from the response
      const { createdAt: userCreatedAt } = response.data;
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleStartGame = () => {
    // Lógica para iniciar la partida
    console.log('Iniciar partida...');
  };

  const handleShowHistory = () => {
    // Lógica para mostrar el historial de partidas
    console.log('Mostrar historial de partidas...');
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
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
