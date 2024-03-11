import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Record from './Record';

const mockAxios = new MockAdapter(axios);

describe('Record component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should render succesfully', async () => {
    mockAxios.onPost('http://localhost:8000/getHistorial').reply(200, {games: []});
    
    render(
    <Router>
      <Record />
    </Router>);

    const linkElement = screen.getByText(/Here you can see your record! All about your past games and all!/i);
    expect(linkElement).toBeInTheDocument();

  });

});
