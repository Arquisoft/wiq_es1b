// src/components/AboutUs.js
import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const AboutUs = () => {

  return(
    <Container component="main" maxWidth="md" sx={{ margin: 8 }}>
      <div className='video-background'>
        <video src='/clouds-background.mp4' autoPlay loop muted data-testid="login-video"/>
      </div>
      <NavigationBar />
      <Typography component="h1" variant="h1" marginBottom={2}>
        About us
      </Typography>
      <Typography variant="body1" align="justify" paragraph>
        WIQ is a game that tests your knowledge with questions featuring multiple possible answers, only one of which is correct, based on information extracted directly from WikiData.
      </Typography>
      <Typography variant="body1" align="justify" paragraph>
        This web application has been developed by the ES01B team as part of the Software Architecture Course, 2023-2024 edition, within the Computer Software Engineering degree at the University of Oviedo.
      </Typography>
      <Typography variant="h4" marginTop={3}>
        Our Team:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="● María López García-Consuegra"/>
        </ListItem>
        <ListItem>
          <ListItemText primary="● Álex Fernández Salé"/>
        </ListItem>
        <ListItem>
          <ListItemText primary="● Mauro Varea Fernández"/>
        </ListItem>
        <ListItem>
          <ListItemText primary="● Lucas Castro Antuña"/>
        </ListItem>
      </List>
    </Container>
  );
};

export default AboutUs;
