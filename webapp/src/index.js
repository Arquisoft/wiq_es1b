import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GetQuestion from "./components/GetQuestion.js";
import Home from "./components/Home.js";
import Record from './components/Record.js';
import {BrowserRouter, Routes, Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /*<React.StrictMode>
    <App />
  </React.StrictMode>*/
  <BrowserRouter>
    <Routes>
      {/** Rutas públicas */}
      <Route path='/' element={<App />} />
      
        <Route path='/home' element={<Home />} />
        <Route path='/getQuestion' element={<GetQuestion />} />
        <Route path='/record' element={<Record />} />
      
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
