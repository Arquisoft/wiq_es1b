// src/components/Ranking.test.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Ranking from './Ranking';

const mockAxios = new MockAdapter(axios);

describe('Ranking component', () => {
  
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
  });

  it('should render succesfully when there are no users', async () => {
    const localStorageMock = {
        getItem: jest.fn(),
    };

    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
    });

    mockAxios.onGet('http://localhost:8000/getGameRecord').reply(200, {games: []});

    mockAxios.onPost('http://localhost:8000/getAllUsers').reply(200, {users: []});
    
    render(
    <Router>
      <Ranking />
    </Router>);

    await waitFor(() => screen.getByText(/Ranking/i));

    const linkElement = screen.getByText(/Ranking/i);
    expect(linkElement).toBeInTheDocument();

  });

  it('should render succesfully', async () => {
    const localStorageMock = {
        getItem: jest.fn(),
    };

    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
    });

    mockAxios.onGet('http://localhost:8000/getGameRecord').reply(200, {games: [{
      user: '123456789563125',
        correctAnswers: 3,
        questions: [
          {
            question: 'Test question 1',
            answersArray: ['Test answer 1', 'Test answer 2', 'Test answer 3', 'Test correct answer'],
            correctAnswer: 'Test correct answer',
            selectedAnswer: 'Test correct answer',
            isCorrect: true
          },
          {
            question: 'Test question 2',
            answersArray: ['Test answer 1', 'Test answer 2', 'Test answer 3', 'Test correct answer'],
            correctAnswer: 'Test correct answer',
            selectedAnswer: 'Test correct answer',
            isCorrect: true
          },
          {
            question: 'Test question 3',
            answersArray: ['Test answer 1', 'Test answer 2', 'Test answer 3', 'Test correct answer'],
            correctAnswer: 'Test correct answer',
            selectedAnswer: 'Test answer 1',
            isCorrect: false
          },
          {
            question: 'Test question 4',
            answersArray: ['Test answer 1', 'Test answer 2', 'Test answer 3', 'Test correct answer'],
            correctAnswer: 'Test correct answer',
            selectedAnswer: 'Test correct answer',
            isCorrect: true
          }
        ]
      }
    ]});

    mockAxios.onPost('http://localhost:8000/getAllUsers').reply(200, {
      users: [
      {
        username: 'user1',
        createdAt: new Date().toISOString(),
      },
      {
        username: 'user2',
        createdAt: new Date().toISOString(),
      },
    ]});
    
    render(
    <Router>
      <Ranking />
    </Router>);

    await waitFor(() => screen.getByText(/Ranking/i));

    const linkElement = screen.getByText(/Ranking/i);
    expect(linkElement).toBeInTheDocument();

    // Check for user1 and their score
    const user1Element = screen.getByText(/user1/i);
    expect(user1Element).toBeInTheDocument();

    // Check for user2 and their score
    const user2Element = screen.getByText(/user2/i);
    expect(user2Element).toBeInTheDocument();

    // Check for score labels
    const scoreLabelElements = screen.getAllByText(/Score:/i);
    expect(scoreLabelElements.length).toBe(2);

    // Check for score values
    const scoreValueElements = screen.getAllByText(/3/i);
    expect(scoreValueElements.length).toBe(2);

  });

});