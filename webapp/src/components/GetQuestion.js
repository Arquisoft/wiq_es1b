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

  const getQuestion = async () => {
    try {
      //call to get a question
      const response = await axios.post(`${apiEndpoint}/getQuestion`, { question, correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3});
      
      // Extract data from the response
      const { question: userCreatedAt } = response.data;

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
