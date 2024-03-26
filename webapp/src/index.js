// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /*<React.StrictMode>
    <App />
  </React.StrictMode>*/
  <BrowserRouter>
    <NavigationBar /> 
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/home' element={<Home />} />
      <Route path='/getQuestion' element={<GetQuestion />} />
      <Route path='/record' element={<Record />} />
      <Route path='/login' element={<Login />} />
      <Route path='/aboutUs' element={<AboutUs />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
