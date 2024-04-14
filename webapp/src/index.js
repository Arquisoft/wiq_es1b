// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Box } from '@mui/material';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GetQuestion from "./components/GetQuestion.js";
import Home from "./components/Home.js";
import Record from './components/Record.js';
import Login from './components/Login.js';
import AboutUs from './components/AboutUs.js';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Help from './components/Help.js';
import GameFinale from './components/GameFinale.js';
import SettingsPage from './components/SettingsPage.js';
import HumanCalculator from './components/HumanCalculator.js';

function logout() {
  localStorage.removeItem('username');
}
//before the window is closed, the username is removed from the local storage so that the user is logged out
window.addEventListener('beforeunload', logout);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Box sx={{ paddingTop: '64px' }}>
      <div className='video-background'>
        <video src='/clouds-background.mp4' autoPlay loop muted data-testid="home-video"/>
      </div>
      <NavigationBar /> 
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/home' element={<Home />} />
        <Route path='/getQuestion' element={<GetQuestion />} />
        <Route path='/record' element={<Record />} />
        <Route path='/login' element={<Login />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/help' element={<Help />} />
        <Route path='/finale' element={<GameFinale />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/humanCalculator' element={<HumanCalculator />} />
      </Routes>
    </Box>
    <Footer />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
