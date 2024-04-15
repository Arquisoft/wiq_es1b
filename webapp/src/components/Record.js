// src/components/Record.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { BarChart } from '@mui/x-charts/BarChart';
import './stylesheets/record.css';

const Record = () => {

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
  
  const navigate = useNavigate();
 
  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user === null) {
      navigate('/');
    }
    // eslint-disable-next-line 
  }, []);

  //accedo al usuario logeado
  const location = useLocation();
  const { username } = location.state || {};
  const { createdAt } = location.state || {};

  const [record, setRecord] = useState([]);

  //data for the chart
  const [loading, setLoading] = useState(true);
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [labels, setLabels] = useState([]);

  const getHistorialForLoggedUser = async () => {
    const response = await axios.post(`${apiEndpoint}/getGameRecord`, { username });
    // Extract data from the response
    let { games } = response.data;
    setRecord(games);

    const totalGames = games.length;
    games = games.slice(-10);
    // Calculate correct and incorrect answers for the chartbar
    const correct = [];
    const incorrect = [];
    const labels = [];
    games.forEach((game, index) => {
      let correctCount = 0;
      let incorrectCount = 0;
      game.questions.forEach(question => {
        if (question.correctAnswer === question.selectedAnswer) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      });
      correct.push(correctCount);
      incorrect.push(incorrectCount);
      labels.push(`Game ${totalGames - games.length + index + 1}`);
      setLoading(false);
    });
    setCorrect(correct);
    setIncorrect(incorrect);
    setLabels(labels);
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

      {!loading && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: '10px',
          width: '460px',
          height: '460px', 
        }}>
          <BarChart
            width={450}
            height={450}
            series={[
              { data: correct, label: 'Correct answers', id: 'correctId' },
              { data: incorrect, label: 'Incorrect answers', id: 'incorrectId' },
            ]}
            xAxis={[{ data: labels, scaleType: 'band' }]}
          />
        </div>
      )}

      <SimpleTreeView style={{ paddingTop: '20px' }}>
        {record.map((game, index) => (
          <TreeItem key={`game-${index}`} itemId={`Game ${index + 1}`} label={`Game ${index + 1}`}>
            {game.questions.map((question, qIndex) => (
              <TreeItem key={`game-${index}-question-${qIndex}`} itemId={`Game ${index + 1}-question ${qIndex + 1}`} label={question.question}>
                <List>
                  <ListItem key={`game-${index}-question-${qIndex}`}>
                    <ListItemText primary={
                        <>
                          Correct Answer: 
                          {question.correctAnswer.startsWith('http') ? 
                            <img src={question.correctAnswer} alt="Correct Answer" style={{maxWidth: '5em', maxHeight: '5em'}} /> : 
                            question.correctAnswer
                          }
                          , Selected: 
                          {question.selectedAnswer.startsWith('http') ? 
                            <img src={question.selectedAnswer} alt="Selected Answer" style={{maxWidth: '5em', maxHeight: '5em'}}/> : 
                            question.selectedAnswer
                          }
                        </>
                      } />  
                  </ListItem>
                </List>
              </TreeItem>
            ))}
          </TreeItem>
        ))}
      </SimpleTreeView>

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
