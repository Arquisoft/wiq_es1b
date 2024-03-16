// src/components/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useNavigate } from "react-router-dom";
import './stylesheets/login.css';

const Login = (onLoginSuccess) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const loginUser = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/login`, { username, password });

      // Extract data from the response
      const { createdAt: userCreatedAt } = response.data;

      setCreatedAt(userCreatedAt);
      setLoginSuccess(true);

      localStorage.setItem("username", username);

      setOpenSnackbar(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  
  useEffect(() => {
    // Redireccionar a la página de inicio cuando loginSuccess se actualice a true con el nombre de usuario y la fecha de creacion de su cuenta
    if (loginSuccess) {
      navigate("/home", { state: { username, createdAt } });
    }
  }, [loginSuccess, navigate, username, createdAt]);

  return (
    <Container component="main" className='wrapper' maxWidth="sm" sx={{ marginTop: 4 }}>
      
        <div>
          <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
            Welcome to WIQ! Log in to start playing!
          </Typography>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button data-testid="loginButton" variant="contained" color="primary" onClick={loginUser}>
            Login
          </Button>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Login successful" />
          {error && (
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
          )}
        </div>
      
    </Container>
  );
};

export default Login;
