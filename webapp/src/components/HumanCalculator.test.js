// src/components/HumanCalculator.test.js
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HumanCalculator from './HumanCalculator';

const mockAxios = new MockAdapter(axios);

describe('HumanCalculator component', () => {
  beforeEach(() => {
    localStorage.setItem('username', 'testUser');

    mockAxios.reset();
    mockAxios.onPost('http://localhost:8000/saveQuestion').reply(200, {});
  });

  const setupTest = async () => {
    return render(
      <MemoryRouter initialEntries={[{
        pathname: '/question',
        state: {
          selectedNumQuestions: 10,
          selectedTimer: 15, 
          username: 'testUser', 
          category: 'todo'
        }
      }]}>
        <HumanCalculator />
      </MemoryRouter>
    );
  };

  it('Should render the component with the answer button', async () => {   
    await setupTest();
    
    await waitFor(() => screen.getByText('Human calculator'));
    const buttons = await screen.findAllByRole('button');
    expect(buttons.length).toBe(1);
  });

  it('Should render the component and generate the first question', async () => {   
    await setupTest();
    
    await waitFor(() => screen.getByText('Human calculator'));
    expect(screen.getByText('Result:')).toBeInTheDocument();
    expect(screen.getByText('Check answer')).toBeInTheDocument();
  });

  it('Should render the component and answer the question rigth', async () => {   
    const { getByTestId } = await setupTest();

    await waitFor(() => screen.getByText('Human calculator'));
  
    const questionElement = getByTestId('question');
    const operation = questionElement.textContent;
    const result = String(eval(operation));

    const inputField = screen.getByLabelText('Result:');
    const button = screen.getByText('Check answer');

    fireEvent.change(inputField, { target: { value: result } });
    fireEvent.click(button);

    expect(inputField).toHaveStyle('background-color: green');
  });

  it('Should render the component and answer the question wrong', async () => {   
    const { getByTestId } = await setupTest();

    await waitFor(() => screen.getByText('Human calculator'));
  
    const questionElement = getByTestId('question');
    const operation = questionElement.textContent;
    const result = String(eval(operation)) + 4;

    const inputField = screen.getByLabelText('Result:');
    const button = screen.getByText('Check answer');

    fireEvent.change(inputField, { target: { value: result } });
    fireEvent.click(button);

    expect(inputField).toHaveStyle('background-color: red');
  });

  it('Should render the component and let the time pass', async () => {   
    jest.useFakeTimers();

    const { getByTestId } = await setupTest();
    await waitFor(() => screen.getByText('Human calculator'));

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    const inputField = screen.getByLabelText('Result:');
    await waitFor(() => expect(inputField).toHaveValue('time out'));
    expect(inputField).toHaveStyle('background-color: red');
  });

  it('Should render the component and enter an invalid input', async () => {   
    const { getByTestId, getByLabelText, getByText } = await setupTest();

    await waitFor(() => screen.getByText('Human calculator'));
  
    const questionElement = getByTestId('question');
    const operation = questionElement.textContent;
    const result = String(eval(operation));

    const inputField = screen.getByLabelText('Result:');
    const button = screen.getByText('Check answer');

    fireEvent.change(inputField, { target: { value: "i" } });
    fireEvent.click(button);

    expect(getByLabelText('Invalid Input')).toBeInTheDocument();
    expect(getByText('Please enter a valid number')).toBeInTheDocument();

  });

  it('Should render the component and answer one questions right and other wrong', async () => {   
    const { getByTestId, getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={[{
        pathname: '/question',
        state: {
          selectedNumQuestions: 10,
          selectedTimer: 15, 
          username: 'testUser', 
          category: 'todo'
        }
      }]}>
        <HumanCalculator />
      </MemoryRouter>
    );

    act(() => {
      jest.useFakeTimers();

      waitFor(() => screen.getByText('Human calculator'));
    
      let questionElement = getByTestId('question');
      let operation = questionElement.textContent;
      let result = String(eval(operation));

      let inputField = screen.getByLabelText('Result:');
      let button = screen.getByText('Check answer');

      fireEvent.change(inputField, { target: { value: result } });
      fireEvent.click(button);

      expect(inputField).toHaveStyle('background-color: green');


      jest.advanceTimersByTime(2000);
    
      questionElement = getByTestId('question');
      operation = questionElement.textContent;
      result = String(eval(operation)) +55 ;
    
      inputField = screen.getByLabelText('Result:');
      fireEvent.change(inputField, { target: { value: result } });
      fireEvent.click(button);
      
      expect(inputField).toHaveStyle('background-color: green');
    });

  });

});