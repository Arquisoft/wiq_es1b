const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');
//libraries required for OpenAPI-Swagger
const swaggerUi = require('swagger-ui-express'); 
const fs = require("fs")
const YAML = require('yaml')

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
app.post('/saveHistorial', (req, res) => handleRequest(getHistorialUrl+'/saveHistorial', req, res));
app.post('/getHistorial', (req, res) => handleRequest(getHistorialUrl+'/getHistorial', req, res));

//para ver el api-doc, entrar en: http://localhost:8000/api-doc/

// Read the OpenAPI YAML file synchronously
const openapiPath='./openapi.yaml'
if (fs.existsSync(openapiPath)) {
  const file = fs.readFileSync(openapiPath, 'utf8');

  // Parse the YAML content into a JavaScript object representing the Swagger document
  const swaggerDocument = YAML.parse(file);

  // Serve the Swagger UI documentation at the '/api-doc' endpoint
  // This middleware serves the Swagger UI files and sets up the Swagger UI page
  // It takes the parsed Swagger document as input
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.log("Not configuring OpenAPI. Configuration file not present.")
}

// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server
