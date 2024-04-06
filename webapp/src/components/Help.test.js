import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Help from './Help';

const mockAxios = new MockAdapter(axios);

const titleId = 'title';
const paragraph1 = 'WIQ is a game that tests your knowledge with questions featuring multiple possible answers, only one of which is correct, based on information extracted directly from WikiData.';


describe('AboutUs component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should render succesfully', async () => {    
    render(
    <Router>
      <Help />
    </Router>);

    await waitFor(() => screen.getByTestId(titleId));

    expect(screen.getByTestId(titleId)).toBeInTheDocument();
    expect(screen.getByText(paragraph1)).toBeInTheDocument();

  });

});