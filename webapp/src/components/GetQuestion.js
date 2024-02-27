// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';


const GetQuestion = () => {
  //all the information about the question
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswer1, setIncorrectAnswer1] = useState('');
  const [incorrectAnswer2, setIncorrectAnswer2] = useState('');
  const [incorrectAnswer3, setIncorrectAnswer3] = useState('');

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  //method to get que information of the question
  const getQuestion = async () => {
    try {
      //call to get a question
      const response = await axios.post(`${apiEndpoint}/getQuestion`, {});
      
      // Extract data from the response, the question, the correct and the incorrect answers
      const { question: q, correctAnswerLabel:correctAnswer, incorrectAnswerLabelSet:incorrect3Answers } = response.data;

      //save the data 
      setQuestion(q);
      setCorrectAnswer(correctAnswer);
      setIncorrectAnswer1(incorrect3Answers[0]);
      setIncorrectAnswer2(incorrect3Answers[1]);
      setIncorrectAnswer3(incorrect3Answers[2]);

    } catch (error) {
      setError(error.response.data.error);
    }
  };


  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      
    </Container>
  );
};

export default GetQuestion;
