// src/components/AddUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const GetQuestion = () => {
  //all the information about the question
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [answersArray, setAnswersArray] = useState([]);
  const [error, setError] = useState('');
  const [isRedy, setIsRedy] = useState(false); 

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  //method to get que information of the question
  const getQuestion = async () => {
    try {
      //call to get a question
      const response = await axios.post(`${apiEndpoint}/getQuestion`);

      // Extract data from the response, the question, the correct and the incorrect answers
      const { question: q, correctAnswerLabel:correctAnswer, answerLabelSet:answers } = response.data;

      //save the data 
      setQuestion(q);
      setCorrectAnswer(correctAnswer);
      setAnswersArray(answers);

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
        
          {/* Generate buttons for the answers */}
          {answersArray.map((answer, index) => (
            <button key={index}>{answer}</button>
          ))}

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
