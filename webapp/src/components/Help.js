// src/components/Help.js
import React, { useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText  } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user === null) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  return(
    <Container component="main" maxWidth="md" sx={{ margin: 8 }}>
      <Typography component="h1" variant="h1" marginBottom={2}>
        Help
      </Typography>
      <Typography variant="body1" align="justify" paragraph>
        WIQ is a game that tests your knowledge with questions featuring multiple possible answers, only one of which is correct, based on information extracted directly from WikiData.
      </Typography>
      <Typography component="h3" variant="h3">
        How to play
      </Typography>
      <List component="ol">
        <ListItem component="li">
          <ListItemText primary="1. Start a game from the Home section." />
        </ListItem>
        <ListItem component="li">
          <ListItemText primary="2. Select the answer that you believe is the correct." />
        </ListItem>
        <ListItem component="li">
          <ListItemText primary="3. Verify whether your answer was correct or not." />
        </ListItem>
        <ListItem component="li">
          <ListItemText primary="4. Proceed to the next question when you're ready." />
        </ListItem>
        <ListItem component="li">
          <ListItemText primary="5. Repeat until reaching the end." />
        </ListItem>
      </List>
      <Typography component="h3" variant="h3">
        Website sections
      </Typography>
      <Typography component="h5" variant="h5" marginLeft={2}>
        Home
      </Typography>
      <Typography variant="body1" marginLeft={3} paragraph>
        The Home section is where you are welcomed and can start a game.
      </Typography>
      <Typography component="h5" variant="h5" marginLeft={2}>
        Record
      </Typography>
      <Typography variant="body1" marginLeft={3} paragraph>
        The Record section is where you can view your played games and their results.
      </Typography>
      <Typography component="h5" variant="h5" marginLeft={2}>
        Help
      </Typography>
      <Typography variant="body1" marginLeft={3} paragraph>
        The Help section is where you can learn how to navigate through our website and play the WIQ game. You are here!
      </Typography>
      <Typography component="h5" variant="h5" marginLeft={2}>
        About us
      </Typography>
      <Typography variant="body1" marginLeft={3} paragraph>
        The About us section is where you can discover information about the development team behind the WIQ game.
      </Typography>
    </Container>
  );
};

export default Help;
