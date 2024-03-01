// src/components/AddUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const GetQuestion = () => {
  //all the information about the question
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswer1, setIncorrectAnswer1] = useState('');
  const [incorrectAnswer2, setIncorrectAnswer2] = useState('');
  const [incorrectAnswer3, setIncorrectAnswer3] = useState('');
  const [error, setError] = useState('');
  const [isRedy, setIsRedy] = useState(false); 

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  //method to get que information of the question
  const getQuestion = async () => {
    try {
      //call to get a question
      const response = await axios.post(`${apiEndpoint}/getQuestion`);

      // Extract data from the response, the question, the correct and the incorrect answers
      const { question: q, correctAnswerLabel:correctAnswer, incorrectAnswerLabelSet:incorrect3Answers } = response.data;

      //save the data 
      setQuestion(q);
      setCorrectAnswer(correctAnswer);
      setIncorrectAnswer1(incorrect3Answers[0]);
      setIncorrectAnswer2(incorrect3Answers[1]);
      setIncorrectAnswer3(incorrect3Answers[2]);

      setIsRedy(true);

    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <Container>
      {isRedy ?  
        <div>
           <h2>
          {question}
        </h2>
        <button>
          {correctAnswer}
        </button>
        <button>
          {incorrectAnswer1}
        </button>
        <button>
          {incorrectAnswer2}
        </button>
        <button>
          {incorrectAnswer3}
        </button>
        </div>
      :
        <div>
          <button onClick={getQuestion}>Siguiente Pregunta</button>
        </div>
      }
      
    </Container>
    
    
  );
};

export default GetQuestion;
