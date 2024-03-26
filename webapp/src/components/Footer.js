// src/components/Footer.js
import React from 'react';
import { Typography } from '@mui/material';

const styles = {
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#1976d2',
    color: '#fff',
    textAlign: 'center',
    padding: '15px',
  },
};

const Footer = () => {

  return (
    <footer style={styles.footer}>
      <Typography component="footer" variant="body1">
        © 2024 WIQ_ES01B. All rights reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
