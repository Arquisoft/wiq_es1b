const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');
//libraries required for OpenAPI-Swagger
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')

const app = express();
app.disable('x-powered-by');
const port = 8000;

const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8002';
const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:8001';
const getQuestionUrl = process.env.QUESTION_SERVICE_URL || 'http://localhost:8003';
const getHistorialUrl = process.env.HISTORIAL_SERVICE_URL || 'http://localhost:8004';

app.use(cors());//NOSONAR
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({ includeMethod: true });
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

app.post('/login', (req, res) => handleRequest(authServiceUrl + '/login', req, res));
app.post('/adduser', (req, res) => handleRequest(userServiceUrl + '/adduser', req, res));
app.get('/generateQuestions', (req, res) => handleRequest(getQuestionUrl + '/generateQuestions', req, res, "get"));
app.get('/getQuestion', async (req, res) => {
  try {
    const category = req.query.category;
    const response = await axios.get(`${getQuestionUrl}/getQuestion`, { params: { category } });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
});
app.post('/saveQuestion', (req, res) => handleRequest(getHistorialUrl + '/saveQuestion', req, res));
app.post('/deleteTempQuestions', (req, res) => handleRequest(getHistorialUrl + '/deleteTempQuestions', req, res));

app.post('/saveGameRecord', async (req, res) => {
  try {
    const { username } = req.body;

    const userResponse = await axios.get(`${authServiceUrl}/getUserByUsername`, { params: { username } });

    const user = userResponse.data.user;

    if (user !== null) {
      const saveResponse = await axios.post(`${getHistorialUrl}/saveGameRecord`, { user: user });
      res.status(200).json(saveResponse.data);
    }
    else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getGameRecord', async (req, res) => {
  try {
    const username = req.query.username;

    const userResponse = await axios.get(`${authServiceUrl}/getUserByUsername`, { params: { username } });

    const user = userResponse.data.user;

    if (user !== null) {
      const saveResponse = await axios.get(`${getHistorialUrl}/getGameRecord`, { params: { user } });
      res.status(200).json(saveResponse.data);
    }
    else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getAllQuestions', async (req, res) => {
  try {
    const download = req.query.download;

    const response = await axios.get(`${getQuestionUrl}/getAllQuestions`, { params: {} });

    const questionsJSON = JSON.stringify(response.data, null, 4);
    fs.writeFileSync('questions.json', questionsJSON);


    if (download) {
      const filePath = `${__dirname}/questions.json`;
      res.download(filePath, 'questions.json', (err) => {
        if(err) {
          console.error('Error al descargar el archivo:', err);
          // Manejar el error
          //res.status(500).send('Error al descargar el archivo');
        } else {
          console.log('Archivo descargado exitosamente');
        }
      });
    }
    else
      res.json(response.data);

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getAllUsers', async (req, res) => {
  try {
    const download = req.query.download;

    const response = await axios.get(`${authServiceUrl}/getAllUsers`, { params: {} })

    const usersJSON = JSON.stringify(response.data, null, 4);
    fs.writeFileSync('users.json', usersJSON);

    if (download) {
      const filePath = `${__dirname}/users.json`;
      res.download(filePath, 'users.json');
    }
    else
      res.json(response.data);


  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

app.post('/getAllUsers', (req, res) => handleRequest(userServiceUrl + '/getAllUsers', req, res));


//para ver el api-doc, entrar en: http://localhost:8000/api-doc/

// Read the OpenAPI YAML file synchronously
const openapiPath = './openapi.yaml'
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
