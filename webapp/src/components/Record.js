// src/components/Record.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { useLocation } from "react-router-dom";

const Record = () => {

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
  
  //accedo al usuario logeado
  const location = useLocation();
  const { username } = location.state || {};

  const getHistorialForLoggedUser = async () => {

    const username2 = username;

    const response = await axios.post(`${apiEndpoint}/getHistorial`, { username2 });
    // Extract data from the response
    const { games: userGames } = response.data;

    //iterar sobre userGames o lo que sea
  }

  const llamaHistorial = () => {

    getHistorialForLoggedUser();

  }

  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography component="h1" variant="h5">
        Record
      </Typography>
     <button onClick={llamaHistorial}>Get Historial</button> 
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
