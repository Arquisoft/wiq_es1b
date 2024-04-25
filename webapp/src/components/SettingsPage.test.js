// src/components/SettingsPage.test.js
import React from 'react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Settings from './SettingsPage';

const mockAxios = new MockAdapter(axios);

describe('Record component', () => {
  
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should render the configuration succesfully', async () => {
    const usernamePrueba = 'usernamePrueba';
    const date = new Date();
    const selectedNumQuestions = 15;
    const selectedTimer = 10;
    // Store values in localStorage
    localStorage.setItem('username', usernamePrueba);
    localStorage.setItem('date', date.toString());
    localStorage.setItem('selectedNumQuestions', selectedNumQuestions.toString());
    localStorage.setItem('selectedTimer', selectedTimer.toString());

    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    expect(screen.getByText('Configuration')).toBeInTheDocument();

  });

 
  it('should render and change the values successfully', async () => {
    const usernamePrueba = 'usernamePrueba';
    const date = new Date();
    const selectedNumQuestions = 15;
    const selectedTimer = 10;
    // Store values in localStorage
    localStorage.setItem('username', usernamePrueba);
    localStorage.setItem('date', date.toString());
    localStorage.setItem('selectedNumQuestions', selectedNumQuestions.toString());
    localStorage.setItem('selectedTimer', selectedTimer.toString());

    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    expect(screen.getByText('Configuration')).toBeInTheDocument();

    const timerInput = screen.getByLabelText('time');
    const questionsInput = screen.getByLabelText('questions');

    fireEvent.change(timerInput, { target: { value: selectedTimer + 1 } });
    fireEvent.change(questionsInput, { target: { value: selectedNumQuestions + 1 } });
  
    expect(timerInput.value).toBe((selectedTimer + 1).toString());
    expect(questionsInput.value).toBe((selectedNumQuestions + 1).toString());

  });
      
  it('should replace invalid high values with default values', async () => {
    
    const selectedNumQuestions = 15;
    const selectedTimer = 10;
    const defaultNumQuestions = 20; 
    const defaultTimer = 20; 
    const invalidValue = 80;
  
    // Store values in localStorage
    localStorage.setItem('selectedNumQuestions', selectedNumQuestions.toString());
    localStorage.setItem('selectedTimer', selectedTimer.toString());
  
    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );
  
    expect(screen.getByText('Configuration')).toBeInTheDocument();
  
    const timerInput = screen.getByLabelText('time');
    const questionsInput = screen.getByLabelText('questions');
  
    // Simulate value change
    fireEvent.change(timerInput, { target: { value: invalidValue } });
    fireEvent.change(questionsInput, { target: { value: invalidValue } });
  
    // Check that the values of the timer and questions input fields have been replaced with the default values
    expect(timerInput.value).toBe(defaultTimer.toString());
    expect(questionsInput.value).toBe(defaultNumQuestions.toString());
  });

  it('should replace invalid low values with default values', async () => {
    
    const selectedNumQuestions = 15;
    const selectedTimer = 10;
    const defaultNumQuestions = 1; 
    const defaultTimer = 1; 
    const invalidValue = 0;
  
    // Store values in localStorage
    localStorage.setItem('selectedNumQuestions', selectedNumQuestions.toString());
    localStorage.setItem('selectedTimer', selectedTimer.toString());
  
    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );
  
    expect(screen.getByText('Configuration')).toBeInTheDocument();
  
    const timerInput = screen.getByLabelText('time');
    const questionsInput = screen.getByLabelText('questions');
  
    // Simulate value change
    fireEvent.change(timerInput, { target: { value: invalidValue } });
    fireEvent.change(questionsInput, { target: { value: invalidValue } });
  
    // Check that the values of the timer and questions input fields have been replaced with the default values
    expect(timerInput.value).toBe(defaultTimer.toString());
    expect(questionsInput.value).toBe(defaultNumQuestions.toString());
  });

});
