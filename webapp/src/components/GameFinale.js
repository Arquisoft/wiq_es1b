// src/components/GameFinale.js
import React, { useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const GameFinale = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  const saveGameRecord = async () => {
    await axios.post(`${apiEndpoint}/saveGameRecord`, { username });
  }

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user === null) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ margin: 8 }}>
      <Typography component="h1" variant="h1" marginBottom={2}>
        Game finished!
      </Typography>
      <Typography component="h2" variant="h5">
        You've successfully tackled all 10 questions!
      </Typography>
      <Typography component="h2" variant="h5">
        Feel free to review them in the record or head back home to start a new game.
      </Typography>
      <Button
        data-testid="saveRecordButton"
        variant="contained"
        style={{ width: '35em', fontWeight: 'bold' }}
        onClick={saveGameRecord}>
        Save record
      </Button>
    </Container>
  );
};

export default GameFinale;
