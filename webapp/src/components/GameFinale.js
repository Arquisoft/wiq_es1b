// src/components/GameFinale.js
import React from 'react';
import { Container, Typography } from '@mui/material';

const GameFinale = () => {

  return(
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
    </Container>
  );
};

export default GameFinale;
