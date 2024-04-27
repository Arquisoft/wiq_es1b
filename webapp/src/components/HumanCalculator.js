// src/components/HumanCalculator.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import './stylesheets/GetQuestionCss.css';
import GameFinale from './GameFinale';

const HumanCalculator = () => {
  const location = useLocation();
  const { username } = location.state || {};
  const { selectedNumQuestions } = location.state || {};
  const { selectedTimer } = location.state || {};
  const [timer, setTimer] = useState(selectedTimer);
  const navigate = useNavigate();

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const [firstNumber, setFirstNumber] = useState(-1);
  const [secondNumber, setSecondNumber] = useState(-1);
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState('');
  const [openE, setOpenE] = useState(false);

  const [questionCount, setQuestionCount] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => { 
    const user = localStorage.getItem('username');
    if (user === null) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

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

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      checkAnswer();
    }
    // eslint-disable-next-line
  }, [timer]);

  const checkAnswer = async () => {
    let isCorrect = false;
    const answerInput = document.querySelector('#result');
    let realResult = eval(`${firstNumber} ${operator} ${secondNumber}`); //NOSONAR
    let answer = result;
    const regex = /^-?\d*([.,]\d+)?$/;
    if ((!regex.test(result) || result === '' ||  result === '-' || result === '-0') && timer != 0) { //NOSONAR
      //invalid input
      setResult('');
      setOpenE(true);
    } else {
      if(timer === 0) {
        setResult('time out');
        answerInput.style.backgroundColor = 'red';
      } else {
        //valid input
          //check question
          if(parseFloat(realResult) === parseFloat(result)) {
            //rigth answer
            if (answerInput) {
              answerInput.style.backgroundColor = 'green';
              isCorrect = true;
            }
          } else {
            //wrong answer
            if (answerInput) {
              answerInput.style.backgroundColor = 'red';
            }
          
        }
      }
      if(timer === 0) {
        answer = 'time out';
      }
      //save question to record
      saveQuestion(`${firstNumber} ${operator} ${secondNumber}`, [result], realResult, answer, isCorrect);
      setIsButtonDisabled(true);
      //wait 3s to let the user see the result
      await new Promise(resolve => setTimeout(resolve, 1000));
      setQuestionCount(questionCount + 1);
      answerInput.style.backgroundColor = 'white';
      //generate new question
      let n1 = result;
      if(timer === 0){
        n1 = getRandomNumber();
      }
      let n2 = getRandomNumber();
      let op = getRandomOperator();
      setFirstNumber(n1);
      setSecondNumber(n2);
      setOperator(op);
      setResult('');
      setIsButtonDisabled(false);
      setTimer(selectedTimer);
    } 
  }

  const saveQuestion = async (question, answersArray, correctAnswer, selectedAnswer, isCorrect) => {
    await axios.post(`${apiEndpoint}/saveQuestion`, { question, answersArray, correctAnswer, selectedAnswer, isCorrect, username });
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

  const buttonStyle = {
    color: 'white',
    backgroundColor: '#209cee',
    '&:hover': {
      backgroundColor: '#1f89cf',
    },
    paddingTop: '10px',
  };

  return (
    <div style={{ padding: '3em', borderRadius: '15px', boxShadow: '0 0 50px #00a6bc', backgroundColor: 'rgba(255, 255, 255, 0.65)', zIndex: 1, marginTop: '2rem' }}>
      {(questionCount <= selectedNumQuestions ? (
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
            <div>
              <Typography variant="h4">
                {`Question nº: ${questionCount} / ${selectedNumQuestions}`}
              </Typography>
              <Typography variant="h4" data-testid="question">
                {`${firstNumber} ${operator} ${secondNumber}`}
              </Typography>
            </div>
            <Box>
              <label htmlFor="result">Result:</label>
              <input type="text" id="result" value={result} onChange={(e) => setResult(e.target.value)} />
            </Box>
            <Button variant="contained" sx={buttonStyle} onClick={() => checkAnswer()} disabled={isButtonDisabled} >
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
            <Typography component="h2" variant="h6" className='question-text'>
                <p>Time left: {timer} seconds</p>
            </Typography>
          </div>
        </Container>
      ) : (
        <GameFinale numberOfQuestions={questionCount -1} />
      ))}
    </div>
  );
};

export default HumanCalculator;
