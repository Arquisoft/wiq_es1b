// src/components/AboutUs.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField} from '@mui/material';
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user === null) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  //manage the number of questions
  const [selectedNumQuestions, setSelectedNumQuestions] = useState(() => {
    const savedNumQuestions = localStorage.getItem('selectedNumQuestions');
    return savedNumQuestions ? Number(savedNumQuestions) : 10;
  });
  const handleNumQuestionsChange = (event) => {
    // to limit the number that the user inputs 
    let value = event.target.value;
    if (value < 1) {
      value = 1;
    } else if (value > 20) {
      value = 20;
    }
    setSelectedNumQuestions(value);
    localStorage.setItem('selectedNumQuestions', value);
  };
  const handleTimerChange = (event) => {
    // to limit the number that the user inputs 
    let value = event.target.value;
    if (value < 1) {
      value = 1;
    } else if (value > 20) {
      value = 20;
    }
    setSelectedTimer(value);
    localStorage.setItem('selectedTimer', value);
  };

  //to manage the timer
  const [selectedTimer, setSelectedTimer] = useState(() => {
    const savedTimer = localStorage.getItem('selectedTimer');
    return savedTimer ? Number(savedTimer) : 15;
  });
  

  return(
    <Container component="main" maxWidth="md" sx={{ margin: 8 }}>
      <Typography variant="h4" component="h1" sx={{ paddingBottom: '2em', textAlign: 'center' }}>
        Configuration
      </Typography>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gridTemplateRows: 'repeat(2, 1fr)', 
        gridColumnGap: '15px', 
        gridRowGap: '15px' 
      }}> 
        <Typography variant="h6" component="h2">
          Number of questions:
        </Typography>
        <TextField
          type="number"
          inputProps={{ min: 1, max: 20 }}
          value={selectedNumQuestions}
          onChange={handleNumQuestionsChange}
          label="questions"
          variant="outlined"
        />
        <Typography variant="h6" component="h2">
          Time limit:
        </Typography>
        <TextField
          type="number"
          inputProps={{ min: 1, max: 20 }}
          value={selectedTimer}
          onChange={handleTimerChange}
          label="time"
          variant="outlined"
        />
      </div>
    </Container>
  );
};

export default SettingsPage;
