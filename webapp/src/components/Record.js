// src/components/Record.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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

      {/* Renderizar el árbol */}
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {record.map((game, index) => (
          <TreeItem key={index} nodeId={`game-${index}`} label={`Game ${index + 1} - Aciertos Totales: ${game.correctAnswers}`}>
            {game.questions.map((question, qIndex) => (
              <TreeItem key={`game-${index}-question-${qIndex}`} nodeId={`game-${index}-question-${qIndex}`} label={question.title}>
                <TreeItem key={`game-${index}-question-${qIndex}-correct-answer`} nodeId={`game-${index}-question-${qIndex}-correct-answer`} label={`Correct answer: ${question.correctAnswer}`} />
                <TreeItem key={`game-${index}-question-${qIndex}-selected-answer`} nodeId={`game-${index}-question-${qIndex}-selected-answer`} label={`Selected: ${question.selectedAnswer}`} />
              </TreeItem>
            ))}
          </TreeItem>
        ))}
      </TreeView>


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
