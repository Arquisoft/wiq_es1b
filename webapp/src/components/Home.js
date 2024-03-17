// src/components/Home.js
import React, { useState } from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';
import logo from '../logo.svg';
import {useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import './stylesheets/home.css';

const Home = () => {
  const [record, setRecord] = useState([]);
  const [userCreatedAt, setUserCreatedAt] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || {};
  const { createdAt } = location.state || {};

  setUserCreatedAt(new Date(createdAt));

  const formattedDate = `${userCreatedAt.getDate().toString().padStart(2, '0')}/${(userCreatedAt.getMonth() + 1).toString().padStart(2, '0')}/${userCreatedAt.getFullYear()}`;
  
  function handleStartGame(){
    // Lógica para iniciar la partida
    navigate("/getQuestion", {state: {username}});
  };

  const handleShowRecord = () => {
    navigate("/record", {state: {username}});
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
      <div className='logoContainer'>
        <img src={logo} alt="Logo" className="logo" style={{ width: '100px', position: 'relative', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
      <Typography component="h2" variant="h5" sx={{ textAlign: 'center' }}>
        Hello {username}!
      </Typography>
      <Typography component="h2" variant="h5" sx={{ textAlign: 'center' }}>
        Your account was created on {formattedDate}!
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
        <Button variant="contained" color="secondary" size="large" onClick={handleShowRecord}>
          Record
        </Button>


      </Stack>
    </Container>
  );
};

export default Home;
