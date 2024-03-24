// src/App.js
import React, { useState } from 'react';
import { CssBaseline, Container, Typography, Link } from '@mui/material';
import AddUser from './components/AddUser';
import Login from './components/Login';

function App() {

  const [showLogin, setShowLogin] = useState(true);

  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Container component="main" maxWidth="xs">  
      <CssBaseline />
      {showLogin ? <Login /> : <AddUser />}
      <Typography component="div" align="center" sx={{ marginTop: 2 }}>        
            {showLogin ? (
              <Link name="gotoregister" component="button" variant="body2" onClick={handleToggleView}>
                Don't have an account? Register here.
              </Link>
            ) : (
              <Link component="button" variant="body2" onClick={handleToggleView}>
                Already have an account? Login here.
              </Link>
            )}          
      </Typography>
    </Container>
  );
}

export default App;
