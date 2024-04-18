// src/components/GameFinale.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Dialog, DialogTitle, DialogActions} from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const GameFinale = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  const [isSaved, setIsSaved] = useState(false);
  const [open, setOpen] = useState(false);

  const saveGameRecord = async () => {
    await axios.post(`${apiEndpoint}/saveGameRecord`, { username });
    setIsSaved(true);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const user = localStorage.getItem('username');
    saveGameRecord();
    if (user === null) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ margin: 8 }}>
      <Typography component="h1" variant="h1" marginBottom={2}>
        Game finished!
      </Typography>
      <Typography component="h2" variant="h5">
        You've successfully tackled all 10 questions!
      </Typography>
      <Typography component="h2" variant="h5">
        Feel free to review them in the record or head back home to start a new game.
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Record saved successfully!</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GameFinale;
