// src/components/GameFinale.js
import React from 'react';
import { Container, Typography } from '@mui/material';

const GameFinale = () => {

  return(
    <Container component="main" maxWidth="md" sx={{ margin: 8 }}>
      <Typography component="h2" variant="h5" className='question-text' style={{ fontWeight: 'bold' }}>
        Finished the game! You have answered all 10 questions, you can see them in the record or go home to start a new game.
      </Typography>
    </Container>
  );
};

export default GameFinale;
