// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const addUser = async () => {
    try {
      await axios.post(`${apiEndpoint}/adduser`, { username, password });
      setOpenSnackbar(true);
      setOpenDialog(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container component="main" maxWidth="xs" className='wrapper' sx={{ marginTop: 4 }}>
      <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 2 }}>
            Welcome to WIQ! Create an account to start playing!
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
      {/*<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="User added successfully" />
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
      )}*/}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"User added successfully"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can now log in with your new account.
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
              {`Error: ${error}`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setError('')} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default AddUser;
