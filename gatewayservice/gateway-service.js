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

const handleRequest = async (url, req, res, method = 'post') => {
  try {
    const response = await axios[method](url, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
};

app.post('/login', (req, res) => handleRequest(authServiceUrl+'/login', req, res));
app.post('/adduser', (req, res) => handleRequest(userServiceUrl+'/adduser', req, res));
app.post('/getQuestion', (req, res) => handleRequest(getQuestionUrl+'/getQuestion', req, res));
app.post('/saveGameRecord', (req, res) => handleRequest(getHistorialUrl+'/saveGameRecord', req, res));
app.post('/getGameRecord', (req, res) => handleRequest(getHistorialUrl+'/getGameRecord', req, res));
app.post('/saveQuestion', (req, res) => handleRequest(getHistorialUrl+'/saveQuestion', req, res));

// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server
