// src/components/AboutUs.js
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const AboutUs = () => {
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
      <div style={{ padding: '4em', borderRadius: '15px', boxShadow: '0 0 50px #00a6bc', backgroundColor: 'rgba(255, 255, 255, 0.65)', zIndex: 1, marginTop: '2rem' }}>
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
      </div>
    </Container>
  );
};

export default AboutUs;
