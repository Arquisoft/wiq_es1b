// src/components/GameFinale.js
import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

const GameFinale = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user === null) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  return(
    <Container component="main" maxWidth="md" sx={{ margin: 8 }}>
      <Typography component="h2" variant="h5" className='question-text' style={{ fontWeight: 'bold' }}>
        Finished the game! You have answered all 10 questions, you can see them in the record or go home to start a new game.
      </Typography>
    </Container>
  );
};

export default GameFinale;
