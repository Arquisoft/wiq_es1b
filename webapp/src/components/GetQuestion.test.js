import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Question from './GetQuestion';

const mockAxios = new MockAdapter(axios);

describe('GetQuestion component', () => {
  beforeEach(() => {
    //set a username in the localstorage so the component can render
    localStorage.setItem('username', 'testUser');

    mockAxios.reset();
    mockAxios.onPost('http://localhost:8000/getQuestion').reply(200, {
      question: 'Test question',
      correctAnswerLabel: 'Test correct answer',
      answerLabelSet: ['Test answer 1', 'Test answer 2', 'Test answer 3', 'Test correct answer']
    });

    mockAxios.onPost('http://localhost:8000/saveHistorial').reply(200, {   
    });
  });

  it('Should render question and answer buttons', async () => {   
    render(
      <MemoryRouter initialEntries={[{
        pathname: '/question',
        state: {
          selectedNumQuestions: 10,
          selectedTimer: 15, 
          username: 'testUser', 
          category: 'todo'
        }
      }]}>
        <Question />
      </MemoryRouter>);
  
    // Wait for the question to appear in the document
    await waitFor(() => screen.getByText('1/10 Test question'));
    
    // Check that there are 5 buttons, 4 for the answers and 1 for the next question
    const buttons = await screen.findAllByRole('button');
    expect(buttons.length).toBe(5);

    // Check that the question and answers are on the screen
    expect(screen.getByText('1/10 Test question')).toBeInTheDocument();
    expect(screen.getByText('Test answer 1')).toBeInTheDocument();
    expect(screen.getByText('Test answer 2')).toBeInTheDocument();
    expect(screen.getByText('Test answer 3')).toBeInTheDocument();
    expect(screen.getByText('Test correct answer')).toBeInTheDocument();
  });

  it('Should play and guess the correct answer', async () => {    
    render(
      <MemoryRouter initialEntries={[{
        pathname: '/question',
        state: {
          selectedNumQuestions: 10,
          selectedTimer: 15, 
          username: 'testUser', 
          category: 'todo'
        }
      }]}>
        <Question />
      </MemoryRouter>);
  
    // Wait for the question to appear in the document
    await waitFor(() => screen.getByText('1/10 Test question'));

    // Click the correct answer
    fireEvent.click(screen.getByText('Test correct answer'));  

    // Wait for feedback to be rendered
    await waitFor(() => expect(screen.getByText('You have won! Congratulations!')).toBeInTheDocument()); 
  });

  it('Should play and select an incorrect answer', async () => {    
    render(
      <MemoryRouter initialEntries={[{
        pathname: '/question',
        state: {
          selectedNumQuestions: 10,
          selectedTimer: 15, 
          username: 'testUser', 
          category: 'todo'
        }
      }]}>
        <Question />
      </MemoryRouter>);
  
    // Wait for the question to appear in the document
    await waitFor(() => screen.getByText('1/10 Test question'));

    // Click the correct answer
    fireEvent.click(screen.getByText('Test answer 1')); 

    // Wait for feedback to be rendered
    await waitFor(() => expect(screen.getByText('You lost! Try again :(')).toBeInTheDocument()); 
  });

  it('Should play and let the time end without answering the question', async () => {    
    //fake timers to run out the real timer of the game
    jest.useFakeTimers();

    render(
      <MemoryRouter initialEntries={[{
        pathname: '/question',
        state: {
          selectedNumQuestions: 10,
          selectedTimer: 15, 
          username: 'testUser', 
          category: 'todo'
        }
      }]}>
        <Question />
      </MemoryRouter>);
  
    // Wait for the question to appear in the document
    await waitFor(() => screen.getByText('1/10 Test question'));

    // we advance the timer 15 seconds
    act(() => {
      jest.advanceTimersByTime(15000);
    });
 
    // Wait for feedback to be rendered
    await waitFor(() => expect(screen.getByText("You lost! You didn't answer in time :(")).toBeInTheDocument()); 
});

});