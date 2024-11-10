require("dotenv").config();
const path = require("path");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Dokumentasi API untuk aplikasi ini",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "refreshToken",
          description: "Use refresh token in cookie",
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4000}`,
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
