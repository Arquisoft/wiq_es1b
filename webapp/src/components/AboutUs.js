// src/components/Home.js
import { Container, Typography } from '@mui/material';

const AboutUs = () => {

  return(
    <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography component="h1" variant="h5">
        About us.
      </Typography>
    </Container>
  );
};

export default AboutUs;