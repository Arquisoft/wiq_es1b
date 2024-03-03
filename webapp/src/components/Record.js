// src/components/Record.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const Record = ({ history }) => {

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography component="h1" variant="h5">
        Record
      </Typography>
      <List>
        {history.map((nCorrect, nFailed, time, score, index) => (
            <ListItem key={index}>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>{index + 1}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={`Partida ${index + 1}`} secondary={`Preguntas acertadas: ${nCorrect}`} />
            </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Record;
