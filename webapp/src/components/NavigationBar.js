// src/components/AboutUs.js
import React from 'react';
import { AppBar, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <AppBar position="static">
      <Tabs
        value={false} // Puedes utilizar esta propiedad para controlar la selección de la pestaña activa
        aria-label="navigation tabs"
        variant="fullWidth"
      >
        <Tab label="Home" 
          sx={{ color: 'white', fontWeight: 'bold' }} 
          component={Link} 
          to="/home" />
        <Tab label="Game" 
          sx={{ color: 'white', fontWeight: 'bold' }} 
          component={Link} 
          to="/getQuestion" />
        <Tab label="Record" 
          sx={{ color: 'white', fontWeight: 'bold' }} 
          component={Link} 
          to="/record" />
        <Tab label="About Us" 
          sx={{ color: 'white', fontWeight: 'bold' }} 
          component={Link} 
          to="/aboutUs" />
      </Tabs>
    </AppBar>
  );
};

export default NavigationBar;
