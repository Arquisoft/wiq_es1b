// src/components/Record.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Box, Grid } from '@mui/material';
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
  const [record, setRecord] = useState([]);

  //data for the chart
  const [loading, setLoading] = useState(true);
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [labels, setLabels] = useState([]);

  const getHistorialForLoggedUser = async () => {
    const response = await axios.get(`${apiEndpoint}/getGameRecord`, { params: { username } });
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
      let correctCount = game.correctAnswers;
      let incorrectCount = game.questions.length - correctCount;
      correct.push(correctCount);
      incorrect.push(incorrectCount);
      labels.push(`Game ${totalGames - games.length + index + 1}`);
      setLoading(false);
    });
    setCorrect(correct);
    setIncorrect(incorrect);
    setLabels(labels);
  }

  useEffect(() => {
    getHistorialForLoggedUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: '4em', borderRadius: '15px', boxShadow: '0 0 50px #00a6bc', backgroundColor: 'rgba(255, 255, 255, 0.65)', zIndex: 1, marginTop: '2rem' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>

            <Typography component="h1" variant="h5">
              Here you can see your record! All about your past games and all!
            </Typography>

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
          </Container>
        </Grid>
        <Grid item xs={12} sm={4}>
          {!loading && (
            <Box position="sticky" top={0} paddingTop="20px">
              <BarChart
                width={500}
                height={400}
                series={[
                  { data: correct, label: 'Correct answers', id: 'correctId' },
                  { data: incorrect, label: 'Incorrect answers', id: 'incorrectId' },
                ]}
                xAxis={[{ data: labels, scaleType: 'band' }]}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Record;
