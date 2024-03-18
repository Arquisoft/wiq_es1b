// src/components/AboutUs.js
import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import NavigationBar from './NavigationBar';

const AboutUs = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const { username } = location.state || {};

  const handleRecordClick = () => {
    console.log("About us: " + username)
    navigate("/record", {state: {username}});
  };

  return(
    <Container component="main" maxWidth="sm">
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
      <Button variant="contained" color="secondary" size="large" onClick={handleRecordClick}>
          Historial
        </Button>
    </Container>
  );
};

export default AboutUs;
