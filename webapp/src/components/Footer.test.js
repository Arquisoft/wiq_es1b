// src/components/Footer.test.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Footer from './Footer';

const mockAxios = new MockAdapter(axios);

const footer = "© 2024 WIQ_ES01B. All rights reserved.";

describe('Footer component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should render succesfully', async () => {    
    render(
    <Router>
      <Footer />
    </Router>);

    await waitFor(() => screen.getByText(footer));

    expect(screen.getByText(footer)).toBeInTheDocument();
  });

});