// src/components/GetQuestion.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Typography, Box, Button } from '@mui/material';
import './stylesheets/GetQuestionCss.css';
import GameFinale from './GameFinale';

const GetQuestion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //get the max number of questions and the timer from the location gotten from the home component
  const { selectedNumQuestions } = location.state || {};
  const { selectedTimer } = location.state || {};
  //all the information about the question
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [answersArray, setAnswersArray] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState('');
  const [nextQuestion, setNextQuestion] = useState(true);
  //timer of the game
  const [timer, setTimer] = useState(selectedTimer);
  //count of questions in the game, starting from 0
  const [questionCount, setQuestionCount] = useState(0);

  //accedo al usuario logeado
  const { username } = location.state || {};
  //category of the game
  const { category } = location.state || {};

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  //method to get que information of the question
  const getQuestion = async () => {
    try {
      setTimer(selectedTimer);

      //to wait for the question, show the charging dots
      setIsReady(false);
      //set nextQuestiona true to make the button to get another question disabled
      setNextQuestion(true);
      //set answer feedback to none
      setAnswerFeedback('');

      //call to get a question
      const response = await axios.get(`${apiEndpoint}/getQuestion`, { params: { category: category } });

      // Extract data from the response, the question, the correct and the incorrect answers
      const { question: q, correctAnswerLabel: correctAnswer, answerLabelSet: answers } = response.data;

      //increment the count of questions
      setQuestionCount(prevCount => prevCount + 1);

      //save the data 
      setQuestion(q);
      setCorrectAnswer(correctAnswer);
      setAnswersArray(answers);

      //set the attribute to show it is ready to true
      setIsReady(true);

    } catch (error) {
      if (error.response) {
        console.error(error.response.data.error);
      } else {
        console.error(error.message);
      }
    }
  };

  const saveQuestion = async (selectedAnswer, isCorrect) => {
    await axios.post(`${apiEndpoint}/saveQuestion`, { question, answersArray, correctAnswer, selectedAnswer, isCorrect, username });
  }

  useEffect(() => {
    getQuestion();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user === null) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  /**
   * Method to check the answer, sets the feedback to show the user if
   * it was right or not, also calls a method to show the color green in the correct
   * answer button and red in the incorrect ones
   * @param {} selectedAnswer of the button clicked
   */
  const checkAnswer = (selectedAnswer) => {
    //only executes the first time a button is clicked
    let correct = false;
    if (answerFeedback === '') {
      if (selectedAnswer === correctAnswer) {
        correct = true;
        setAnswerFeedback("You have won! Congratulations!");
      } else if (timer === 0) {
        selectedAnswer = "Time out";
        setAnswerFeedback("You lost! You didn't answer in time :(");
      } else {
        setAnswerFeedback("You lost! Try again :(");
      }
      saveQuestion(selectedAnswer, correct);
      showAnswerColors();
      setNextQuestion(false);
    }
  }

  /**
   * Method to change the background color to the buttons
   */
  const showAnswerColors = () => {
    const answersDiv = document.querySelector('.answers');
    if (answersDiv) {
      const buttons = answersDiv.querySelectorAll('button');
      buttons.forEach(button => {
        button.style.color = 'black';
        if (button.value === correctAnswer) {
          button.style.backgroundColor = 'green';
        } else {
          button.style.backgroundColor = 'red';
        }
        //disable the buttons so the user cannot choose another option
        button.disabled = true;
      });
    }
  };

  /**
   * The timer of each question, checks if the question is answered or not, to stop or keep counting until 0
   */
  useEffect(() => {
    if (isReady && timer > 0 && nextQuestion) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && nextQuestion) {
      checkAnswer(null);
    }
    // eslint-disable-next-line
  }, [isReady, timer, nextQuestion]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      width: '80vw',
      padding: '1em', 
      borderRadius: '15px', 
      boxShadow: '0 0 50px #00a6bc', 
      backgroundColor: 'rgba(255, 255, 255, 0.65)', 
      zIndex: 1, 
      marginTop: '2rem'
    }}>
      {(questionCount <= selectedNumQuestions ? (
        <Container component="main" maxWidth="md" sx={{ margin: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {isReady && (
            <div className='answers' style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Typography component="h2" variant="h5" className='question-text' style={{ fontWeight: 'bold' }}>
                {questionCount}/{selectedNumQuestions} {question}
              </Typography>
              {/* Generate buttons for the answers */}
              <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center', marginY: '0.6em', gridRowGap: '0.5em', gridColumnGap: '1em' }}>
                {answersArray.map((answer, index) => (
                  <Box key={answer} sx={{ display: 'flex', alignItems: 'center', marginY: '0.6em' }}>
                    <Button
                      value={answer}
                      data-testid={`answer${index}Button`}
                      variant="contained"
                      sx={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold', '&:hover': { backgroundColor: 'black', color: 'white' } }}
                      key={index}
                      onClick={() => checkAnswer(answer)}
                      disabled={!nextQuestion}>
                      {answer.startsWith('http') ? <img src={answer} alt="answer" style={{ width: '15vw', height: '10vw' }} /> : answer}
                    </Button>
                  </Box>
                ))}
              </Box>
              {/* To show the time left */}
              <Typography component="h2" variant="h6" className='question-text'>
                <p>Time left: {timer} seconds</p>
              </Typography>
              {/* To show the feedback after answering */}
              <Typography component="h2" variant="h6" className='question-text'>
                <p>{answerFeedback}</p>
              </Typography>
            </div>
          )}
          {isReady && (
            <div>
              {/* Button to request a new question It will be disabled when the question is not answered */}
              <Button
                data-testid="nextQuestionButton"
                variant="contained"
                style={{ width: '35em', fontWeight: 'bold', color: 'white', backgroundColor:'#209cee' }}
                onClick={getQuestion}
                disabled={nextQuestion}>
                Next question
              </Button>
            </div>
          )}
          {/* If the question is charging shows two circles to show it is charging */}
          {!isReady && (
            <div className='charging'>
              <div className='ball one'></div>
              <div className='ball two'></div>
            </div>
          )}
        </Container>
      ) : (
        <GameFinale numberOfQuestions={questionCount-1} />
      ))}
    </div>
  );
};

export default GetQuestion;
