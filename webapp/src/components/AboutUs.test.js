import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AboutUs from './AboutUs';

const mockAxios = new MockAdapter(axios);

const title = 'About us';

describe('AboutUs component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should render succesfully', async () => {    
    render(
    <Router>
      <AboutUs />
    </Router>);

    await waitFor(() => screen.getByText('About us'));

    expect(screen.getByText(title)).toBeInTheDocument();

  });

});
