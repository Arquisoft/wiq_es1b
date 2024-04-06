import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AboutUs from './AboutUs';

const mockAxios = new MockAdapter(axios);

const title = 'About us';
const paragraph1 = 'WIQ is a game that tests your knowledge with questions featuring multiple possible answers, only one of which is correct, based on information extracted directly from WikiData.';
const paragraph2 = 'This web application has been developed by the ES01B team as part of the Software Architecture Course, 2023-2024 edition, within the Computer Software Engineering degree at the University of Oviedo.';

const subtitle = 'Our Team:';
const member1 = '● María López García-Consuegra';
const member2 = '● Álex Fernández Salé';
const member3 = '● Mauro Varea Fernández';
const member4 = '● Lucas Castro Antuña';

describe('AboutUs component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should render succesfully', async () => {    
    render(
    <Router>
      <AboutUs />
    </Router>);

    await waitFor(() => screen.getByText(title));

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(paragraph1)).toBeInTheDocument();
    expect(screen.getByText(paragraph2)).toBeInTheDocument();

    expect(screen.getByText(subtitle)).toBeInTheDocument();
    expect(screen.getByText(member1)).toBeInTheDocument();
    expect(screen.getByText(member2)).toBeInTheDocument();
    expect(screen.getByText(member3)).toBeInTheDocument();
    expect(screen.getByText(member4)).toBeInTheDocument();
  });

});
