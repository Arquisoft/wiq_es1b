import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Home from './Home';
import { createMemoryHistory } from 'history';

const mockAxios = new MockAdapter(axios);

describe('Home component', () => {
  beforeEach(() => {
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
    expect(buttons.length).toBe(4);

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
    
});
