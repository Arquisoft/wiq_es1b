// src/components/Ranking.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const Ranking = () => {

    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
    
    const navigate = useNavigate();
   
    useEffect(() => {
      const user = localStorage.getItem('username');
      if (user === null) {
        navigate('/');
      }
      // eslint-disable-next-line 
    }, []);
  
    
  
    return (
        <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>

        </Container>
    );
  };
  
  export default Ranking;