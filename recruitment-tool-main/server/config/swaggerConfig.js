const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'HR Recruitment Tool API Reference',
    version: '1.0.0'
  },
};

const options = {
  swaggerDefinition,
  apis: [
    './routes.js',
    './controllers/jobsController.js',
    './controllers/jobInterviewsController.js',
    './controllers/jobCandidatesController.js',
    './controllers/candidatesController.js',
    './controllers/candidateInterviewsController.js',
    './controllers/interviewsController.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
