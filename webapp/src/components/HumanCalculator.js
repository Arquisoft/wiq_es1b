// src/components/GetQuestion.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import './stylesheets/GetQuestionCss.css';


const HumanCalculator = () => {
  const location = useLocation();
  const { username } = location.state || {};
  const { selectedNumQuestions } = location.state || {};
  const { selectedTimer } = location.state || {};
  const navigate = useNavigate();

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const [firstNumber, setFirstNumber] = useState(-1);
  const [secondNumber, setSecondNumber] = useState(-1);
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState('');
  const [realResult, setRealResult] = useState(-1);
  const [openE, setOpenE] = useState(false);

  /**useEffect(() => { 
    const user = localStorage.getItem('username');
    if (user === null) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);**/
  
  const saveQuestion = async (question, answersArray, correctAnswer, selectedAnswer, isCorrect) => {
    await axios.post(`${apiEndpoint}/saveQuestion`, { question, answersArray, correctAnswer, selectedAnswer, isCorrect, username });
  }

  const getRandomNumber = () => {
    const number = Math.floor(Math.random() * 51);
    const sign = Math.random() < 0.5 ? -1 : 1;
    return number * sign;
  }
  
  //devuelve un operador aleatorio para las operaciones
  const getRandomOperator = () => {
    const operators = ['+', '-', '*', '/'];
    return operators[Math.floor(Math.random() * operators.length)];
  }

  const checkAnswer = () => {

  }

  const validateInput = (input) => {
    const regex = /^-?\d*$/;
    if (!regex.test(input)) {
      setResult('');
      setOpenE(true);
    } else {
      setResult(input);
    }
  }

  const handleCloseE = () => {
    setOpenE(false);
  };

  //get the first operation when the component is first rendered
  useEffect(() => {
    setFirstNumber(getRandomNumber());
    setSecondNumber(getRandomNumber());
    setOperator(getRandomOperator());
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        alignItems: 'center',
        justifyItems: 'center',
        width: '50em',
        height: '30em',
        margin: '0 auto',
        paddingBottom: '5em'
        }}>
        <Typography variant='h3'>
          Human calculator
        </Typography>
        <Typography variant="h4">
          {`${firstNumber} ${operator} ${secondNumber}`}
        </Typography>
        <Box>
          <label htmlFor="result">Result:</label>
          <input type="text" id="result" value={result} onChange={(e) => validateInput(e.target.value)} />
        </Box>
        <Button variant="contained" color="primary" onClick={() => checkAnswer()} style={{ paddingTop: '10px' }}>
          Check answer
        </Button>
        <Dialog
          open={openE}
          onClose={handleCloseE}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Invalid Input"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please enter a valid number
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseE} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
};

export default HumanCalculator;
