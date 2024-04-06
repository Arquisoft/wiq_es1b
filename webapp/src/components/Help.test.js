import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Help from './Help';

const mockAxios = new MockAdapter(axios);

const titleId = 'title';
const paragraph1 = 'WIQ is a game that tests your knowledge with questions featuring multiple possible answers, only one of which is correct, based on information extracted directly from WikiData.';

const subtitle1 = 'How to play';
const ol1 = '1. Start a game from the Home section.';
const ol2 = '2. Select the answer that you believe is the correct.';
const ol3 = '3. Verify whether your answer was correct or not.';
const ol4 = "4. Proceed to the next question when you're ready.";
const ol5 = '5. Repeat until reaching the end.';

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

    expect(screen.getByText(subtitle1)).toBeInTheDocument();
    expect(screen.getByText(ol1)).toBeInTheDocument();
    expect(screen.getByText(ol2)).toBeInTheDocument();
    expect(screen.getByText(ol3)).toBeInTheDocument();
    expect(screen.getByText(ol4)).toBeInTheDocument();
    expect(screen.getByText(ol5)).toBeInTheDocument();

  });

});