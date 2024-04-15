// src/components/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions  } from '@mui/material';
import { useNavigate } from "react-router-dom";
import './stylesheets/login.css';
import '../index.css';

const Login = (onLoginSuccess) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const navigate = useNavigate();

  const [selectedTimer, setSelectedTimer] = useState('');
  const [selectedNumQuestions, setSelectedNumQuestions] = useState('');

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const loginUser = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/login`, { username, password });

      // Extract data from the response
      const { createdAt: userCreatedAt } = response.data;

      setCreatedAt(userCreatedAt);
      setLoginSuccess(true);

      localStorage.setItem("username", username);

      //default configurations of the game
      localStorage.setItem('selectedTimer', 15);
      localStorage.setItem('selectedNumQuestions', 10);
      setSelectedTimer(15);
      setSelectedNumQuestions(10);

      await axios.post(`${apiEndpoint}/generateQuestions`, {});

    } catch (error) {
      setError(error.response.data.error);
    }
  };
  
  useEffect(() => {
    // Redireccionar a la página de inicio cuando loginSuccess se actualice a true con el nombre de usuario y la fecha de creacion de su cuenta
    if (loginSuccess) {
      navigate("/home", { state: { username, createdAt, selectedTimer, selectedNumQuestions  } });
    }
  }, [loginSuccess, navigate, username, createdAt, selectedTimer, selectedNumQuestions]);

  return (
    <Container component="main" >
        <div className="welcome-container">
          <Typography variant="h4" className="welcome-text">
            Welcome to WIQ!
          </Typography>
        </div>
        <div style={{ padding: '4em', borderRadius: '15px', boxShadow: '0 0 50px #00a6bc', backgroundColor: 'rgba(255, 255, 255, 0.65)', zIndex: 1, marginTop: '2rem' }}>
          <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }} fontWeight='bold'>
            Log in to start playing!
          </Typography>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <TextField
            name="username"
            margin="normal"
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            name="password"
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
          {/* dialog to show error during adding a user */}
          {error && (
            <Dialog open={!!error} onClose={() => setError('')}>
              <DialogTitle>{"Error"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {`${error}`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setError('')} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
    </Container>
  );
};

export default Login;
