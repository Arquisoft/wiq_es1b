// src/components/Record.test.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Record from './Record';
import { createMemoryHistory } from 'history';

const mockAxios = new MockAdapter(axios);
jest.mock('axios');

describe('Record component', () => {
  
  beforeEach(() => {
    mockAxios.reset();
  });

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    localStorage.setItem('username', 'user');
  });

  it('should render succesfully', async () => {
    const games = [
      {
        user: '60d6c47e0b5f5c15d44c9a2c',
        correctAnswers: 2,
        questions: [
          {
            question: 'What is the capital of Spain?',
            answersArray: ['Madrid', 'Barcelona', 'Valencia', 'Seville'],
            correctAnswer: 'Madrid',
            selectedAnswer: 'Madrid',
            isCorrect: true
          },
          {
            question: 'What is the capital of France?',
            answersArray: ['Paris', 'Lyon', 'Marseille', 'Nice'],
            correctAnswer: 'Paris',
            selectedAnswer: 'Lyon',
            isCorrect: false
          },
          {
            question: 'What is the capital of Italia?',
            answersArray: ['Rome', 'Lyon', 'Marseille', 'Nice'],
            correctAnswer: 'Rome',
            selectedAnswer: 'Rome',
            isCorrect: false
          }
        ]
      },
      {
        user: '60d6c47e0b5f5c15d44c9a2d',
        correctAnswers: 1,
        questions: [
          {
            question: 'What is the capital of Italy?',
            answersArray: ['Rome', 'Milan', 'Naples', 'Turin'],
            correctAnswer: 'Rome',
            selectedAnswer: 'Rome',
            isCorrect: true
          },
          {
            question: 'What is the capital of Germany?',
            answersArray: ['Berlin', 'Hamburg', 'Munich', 'Cologne'],
            correctAnswer: 'Berlin',
            selectedAnswer: 'Munich',
            isCorrect: false
          }
        ]
      }
    ]
    axios.get.mockResolvedValueOnce({ data: { games } });
    
    render(
    <Router>
      <Record />
    </Router>);

    expect(screen.getByText('Record')).toBeInTheDocument();

    await waitFor(() => screen.getByText('Here you can see your record! All about your past games and all!'));

  

  });

  it('should render succesfully', async () => {
    localStorage.removeItem('username');

    const games = [
  
    ]
    axios.get.mockResolvedValueOnce({ data: { games } });

    render(
    <Router>
      <Record />
    </Router>);

    expect(screen.getByText('Record')).toBeInTheDocument();

    await waitFor(() => screen.getByText('Here you can see your record! All about your past games and all!'));

  });

});
