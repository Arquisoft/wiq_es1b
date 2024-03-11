// src/components/Record.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useLocation } from "react-router-dom";
import {useNavigate} from "react-router-dom";


const Record = () => {

  const navigate = useNavigate();

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
  
  //accedo al usuario logeado
  const location = useLocation();
  const { username } = location.state || {};

  const [record, setRecord] = useState([]);

  const getHistorialForLoggedUser = async () => {

    const username2 = username;

    const response = await axios.post(`${apiEndpoint}/getHistorial`, { username2 });
    // Extract data from the response
    const { games: userGames } = response.data;
    setRecord(userGames);

  }

  const showHome = () => {
    navigate("/home", {state: {username}});
  };

  useEffect(() => {
    getHistorialForLoggedUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography component="h1" variant="h5">
        Here you can see your record! All about your past games and all!
      </Typography>
     
      <List>
        {record.map((game, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={game.title}
              secondary={
                <React.Fragment>
                  <Typography variant="body1">{`Correct answer: ${game.correctAnswer}`}</Typography>
                  <Typography variant="body2">{`Selected: ${game.selectedAnswer}`}</Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
      <Button
          variant="contained" 
          style={{ width: '100%', fontWeight: 'bold' }}
          onClick={showHome}>
            Home
          </Button>
    </Container>
  );
};

export default Record;
