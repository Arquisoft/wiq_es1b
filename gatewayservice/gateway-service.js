const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');

const app = express();
const port = 8000;

const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8002';
const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:8001';
const getQuestionUrl = process.env.QUESTION_SERVICE_URL || 'http://localhost:8003';
const getHistorialUrl = process.env.HISTORIAL_SERVICE_URL || 'http://localhost:8004';

app.use(cors());
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

app.post('/login', async (req, res) => {
  try {
    // Forward the login request to the authentication service
    const authResponse = await axios.post(authServiceUrl+'/login', req.body);
    res.json(authResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/adduser', async (req, res) => {
  try {
    // Forward the add user request to the user service
    const userResponse = await axios.post(userServiceUrl+'/adduser', req.body);
    res.json(userResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/getQuestion', async (req, res) => {
  try {
    // Forward the getQuestion request to the question service
    const questionResponse = await axios.post(getQuestionUrl+'/getQuestion');
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/saveHistorial', async (req, res) => {
  try {
    // Forward the saveHistorial request to the historial service
    const questionResponse = await axios.post(getHistorialUrl+'/saveHistorial', req.body);
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/getHistorial', async (req, res) => {
  try {
    // Forward the getHistorial request to the historial service
    const questionResponse = await axios.post(getHistorialUrl+'/getHistorial', req.body);
    res.json(questionResponse.data);
  } catch (error) {
    
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server
