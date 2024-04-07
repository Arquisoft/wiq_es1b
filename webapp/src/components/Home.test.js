import React from 'react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Home from './Home';
import { createMemoryHistory } from 'history';

const mockAxios = new MockAdapter(axios);

describe('Home component', () => {
  beforeEach(() => {
    localStorage.setItem('username', 'testUser');
    mockAxios.reset();
  });

  it('should show the username, date and buttons successfully', async () => {

    const usernamePrueba = 'usernamePrueba';
    //put the date in the same format as the one in the component
    const date = new Date();
    const createdAt = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

    render(
      <MemoryRouter initialEntries={[{ pathname: '/home', state: { username: usernamePrueba, createdAt: date } }]}>
        <Home />
      </MemoryRouter>
    );

    //compruebo que hay dos botones, jugar y record
    const buttons = await screen.findAllByRole('button');
    expect(buttons.length).toBe(5);

    expect(screen.getByText(/Here you can start a new game!/i)).toBeInTheDocument();
    expect(screen.getByText(`Hello ${usernamePrueba}!`)).toBeInTheDocument();
    expect(screen.getByText(`Your account was created on ${createdAt}.`)).toBeInTheDocument();
  });

  it('should call getQuestion successfully', async () => {

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Home />
      </Router>
    );

    //click the new game button
    const newGameButton = await screen.findByText('New Full Random Game');
    fireEvent.click(newGameButton);

    //checks it navigates out of the home page
    expect(history.location.pathname).toBe('/');
    
  });

  it('should render all buttons successfully', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Home />
      </Router>
    );

    // Make sure all the buttons are rendered
    expect(screen.getByText('New Full Random Game')).toBeInTheDocument();
    expect(screen.getByText('New Images Game')).toBeInTheDocument();
    expect(screen.getByText('New Geography Game')).toBeInTheDocument();
    expect(screen.getByText('New Science Game')).toBeInTheDocument();
  });

  it('should render all configuration buttons successfully', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Home />
      </Router>
    );

    const configButton = screen.getByText('Configuration of the game');
    fireEvent.click(configButton);

    const questionsButton = screen.getByText(/Press to change nº of questions:/);
    fireEvent.click(questionsButton);
    expect(await screen.findByText('5')).toBeInTheDocument();
    expect(await screen.findByText('10')).toBeInTheDocument();
    expect(await screen.findByText('15')).toBeInTheDocument();

    const timeLimitButton = screen.getByText(/Press to change the time limit:/);
    fireEvent.click(timeLimitButton);
    expect(await screen.findByText('20')).toBeInTheDocument();
    
  });
    
});
