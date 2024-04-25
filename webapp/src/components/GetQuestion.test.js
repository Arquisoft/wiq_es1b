import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Question from './GetQuestion';

const mockAxios = new MockAdapter(axios);

describe('GetQuestion component', () => {
  beforeEach(() => {
    localStorage.setItem('username', 'testUser');

    mockAxios.reset();
    mockAxios.onGet('http://localhost:8000/getQuestion').reply(200, {
      question: 'Test question',
      correctAnswerLabel: 'Test correct answer',
      answerLabelSet: ['Test answer 1', 'Test answer 2', 'Test answer 3', 'Test correct answer']
    });

    mockAxios.onPost('http://localhost:8000/saveQuestion').reply(200, {});
  });

  const setupTest = async () => {
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
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('1/10 Test question'));
  };

  it('Should render question and answer buttons', async () => {   
    await setupTest();
    
    const buttons = await screen.findAllByRole('button');
    expect(buttons.length).toBe(5);
    expect(screen.getByText('Test answer 1')).toBeInTheDocument();
    expect(screen.getByText('Test answer 2')).toBeInTheDocument();
    expect(screen.getByText('Test answer 3')).toBeInTheDocument();
    expect(screen.getByText('Test correct answer')).toBeInTheDocument();
  });

  it('Should play and guess the correct answer', async () => {    
    await setupTest();

    fireEvent.click(screen.getByText('Test correct answer'));  

    await waitFor(() => expect(screen.getByText('You have won! Congratulations!')).toBeInTheDocument()); 
  });

  it('Should play and select an incorrect answer', async () => {    
    await setupTest();

    fireEvent.click(screen.getByText('Test answer 1')); 

    await waitFor(() => expect(screen.getByText('You lost! Try again :(')).toBeInTheDocument()); 
  });

  it('Should play and let the time end without answering the question', async () => {    
    jest.useFakeTimers();

    await setupTest();

    act(() => {
      jest.advanceTimersByTime(15000);
    });
 
    await waitFor(() => expect(screen.getByText("You lost! You didn't answer in time :(")).toBeInTheDocument()); 
  });
});