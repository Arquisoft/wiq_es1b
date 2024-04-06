// src/components/Record.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
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
    const response = await axios.post(`${apiEndpoint}/getGameRecord`, { username });
    // Extract data from the response
    const { games: games } = response.data;
    setRecord(games);

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

      <SimpleTreeView>
        {record.map((game, index) => (
          <TreeItem itemId={`Game ${index + 1}`} label={`Game ${index + 1}`}>
            {game.questions.map((question, qIndex) => (
              <TreeItem itemId={`Game ${index + 1}-question ${qIndex + 1}`} label='question.tittle'>
                <List>
                  <ListItem key={`game-${index}-question-${qIndex}`}>
                    <ListItemText primary={`Correct Answer: ${question.correctAnswer}, Selected: ${question.selectedAnswer}`} />
                  </ListItem>
                </List>
              </TreeItem>
            ))}
          </TreeItem>
        ))}
      </SimpleTreeView>

      {/* <List>
        {record.map((game, index) => (
          <ListItem key={game._id}>
            <ListItemText primary={`Game ${index + 1}`} secondary={`User: ${game.user}`} />
            <List>
              {game.questions.map((question, qIndex) => (
                <ListItem key={`game-${index}-question-${qIndex}`}>
                  <ListItemText primary={`Question ${qIndex + 1}`} secondary={`Correct Answer: ${question.correctAnswer}, Selected: ${question.selectedAnswer}`} />
                </ListItem>
              ))}
            </List>
          </ListItem>
        ))}
      </List> */}

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
