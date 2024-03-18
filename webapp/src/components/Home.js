// src/components/Home.js
import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Typography, Button, Stack } from '@mui/material';
import NavigationBar from './NavigationBar';
import './stylesheets/home.css';
import logo from '../logo.svg';

const Home = () => {

  //const [record, setRecord] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || {};
  
  function handleStartGame() {
    // Lógica para iniciar la partida
    navigate("/getQuestion", {state: {username}});
  };  
/*
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
    navigate("/record", {state: {username}});
  };
*/
  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
      <NavigationBar />
      <div className='logoContainer'>
        <img src={logo} alt="Logo" className="logo" style={{ width: '100px', position: 'relative', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
      <Typography component="h2" variant="h5" sx={{ textAlign: 'center' }}>
        Hello {username}!
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
