// src/components/Home.js
import React, { useState } from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';
import logo from '../logo.svg';
import {useNavigate} from "react-router-dom";


const Home = ({ username, createdAt }) => {
  const [record, setRecord] = useState([]);
  const navigate = useNavigate();

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
  
  function handleStartGame(){
    // Lógica para iniciar la partida
    navigate("/getQuestion");
  };
  

  const addToRecord = (nCorrect, nIncorrect, time, points) => {
    const newEntrada = { nCorrect, nIncorrect, time, points};
    setRecord([...record, newEntrada]);
  }

  const handleShowRecord = () => {
    const correctAnswers = 5; // Ejemplo de número de respuestas correctas
    const incorrectAnswers = 2; // Ejemplo de número de respuestas incorrectas
    const time = '10:30'; // Ejemplo de tiempo de juego
    const points = 100; // Ejemplo de puntos obtenidos
    addToRecord(correctAnswers, incorrectAnswers, time, points);
    navigate("/record");
  };



  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
        Welcome to the 2024 edition of the Software Architecture course
      </Typography>
      <Typography component="h2" variant="h5" sx={{ textAlign: 'center' }}>
        Hello {username}!
      </Typography>
      <Typography component="p" variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
        Your account was created on {new Date(createdAt).toLocaleDateString()}.
      </Typography>
      <img src={logo} alt="Logo" style={{ width: '100px', position: 'absolute', top: '20px', left: '20px' }} />
      <Stack spacing={2} sx={{ marginTop: 4 }}>
        
      <Button variant="contained" color="primary" size="large" onClick={handleStartGame}>
          Nuevo Juego
        </Button>
        <Button variant="contained" color="secondary" size="large" onClick={handleShowRecord}>
          Historial
        </Button>


      </Stack>
    </Container>
  );
};

export default Home;
