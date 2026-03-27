import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    "openapi": "3.0.0",
    "info": { "title": "My API", "version": "1.0.0" },
    "components": {
      "securitySchemes": {
        "ServiceToken": { "type": "apiKey", "in": "header", "name": "x-service-token" },
      }
    },
    "security": [{ "ServiceToken": [] }],
  },
  apis: ['./swagger/*.swagger'], // where your routes are
};

const specs = swaggerJsdoc(options);

export default specs;