// src/components/Record.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import './stylesheets/record.css';

const Record = () => {

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  //accedo al usuario logeado
  const location = useLocation();
  const { username } = location.state || {};
  const { createdAt } = location.state || {};

  const navigate = useNavigate();

  const [record, setRecord] = useState([]);

  const getHistorialForLoggedUser = async () => {
    const username2 = username;

    const response = await axios.post(`${apiEndpoint}/getGameRecord`, { username2 });
    // Extract data from the response
    const { games: userGames } = response.data;
    setRecord(userGames);

  }

  const showHome = () => {
    navigate("/home", { state: { username, createdAt } });
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
          <List>
            {game.map((question, qIndex) => (
              <ListItem key={qIndex}>
                <ListItemText
                  primary={question.tittle}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body1">{`Correct answer: ${question.correctAnswer}`}</Typography>
                      <Typography variant="body2">{`Selected: ${question.selectedAnswer}`}</Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
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
