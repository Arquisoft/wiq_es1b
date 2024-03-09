// src/components/Record.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

const Record = () => {

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography component="h1" variant="h5">
        Record
      </Typography>
      <List>
        {/*{record.map((entrada, index) => (
            <ListItem key={index}>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>{index + 1}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={`Partida ${index + 1}`} secondary={`Preguntas acertadas: ${entrada.nCorrect}`} />
            </ListItem>
        ))}*/}
      </List>
    </Container>
  );
};

export default Record;
