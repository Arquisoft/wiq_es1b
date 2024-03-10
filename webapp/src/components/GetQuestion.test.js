import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import GetQuestion from '../components/GetQuestion';
import Login from './Login';

jest.mock('axios');

describe('GetQuestion component', () => {
    beforeEach(() => {
        axios.post.mockResolvedValue({
          data: {
            question: 'What is the capital of France?',
            correctAnswerLabel: 'Paris',
            answerLabelSet: ['Paris', 'London', 'Madrid', 'Lisbon']
          }
        });
      });

    test('Should render question and answer buttons', async () => {
    render(<GetQuestion />);

    // Wait for the question to be rendered
    await waitFor(() => expect(screen.getByText('What is the capital of France?')).toBeInTheDocument());

    // Check if answer buttons are rendered
    expect(screen.getByTestId('answer0Button')).toBeInTheDocument();
    expect(screen.getByTestId('answer1Button')).toBeInTheDocument();
    expect(screen.getByTestId('answer2Button')).toBeInTheDocument();
    expect(screen.getByTestId('answer3Button')).toBeInTheDocument();
    });
  
});
