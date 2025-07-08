// Swagger definition for THUNAY backend API
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'THUNAY Backend API',
    version: '1.0.0',
    description: 'API documentation for the THUNAY project as per SRS requirements.',
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Local server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
