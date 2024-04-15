// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import {useNavigate} from "react-router-dom";
import './stylesheets/login.css';
import '../index.css';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const addUser = async () => {
    try {
      await axios.post(`${apiEndpoint}/adduser`, { username, password });
      
      setOpenDialog(true);
      
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="xs" className='wrapper' sx={{ marginTop: 4 }}>
      <div className="welcome-container">
          <Typography variant="h4" className="welcome-text">
            Welcome to WIQ!
          </Typography>
      </div>
      <div style={{ padding: '4em', borderRadius: '15px', boxShadow: '0 0 50px #00a6bc', backgroundColor: 'rgba(255, 255, 255, 0.65)', zIndex: 1, marginTop: '2rem' }}>
        <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
            Create an account to start playing!
          </Typography>
        <Typography component="h1" variant="h5">
          Add User
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
        <Button variant="contained" color="primary" onClick={addUser}>
          Add User
        </Button>
        {/* dialogs to show sucess or error during adding a user */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{"Success"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              User added successfully.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
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

export default AddUser;
