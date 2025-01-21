import dotenv from "dotenv";
import path from "path";
import swaggerJsDoc from "swagger-jsdoc";
import { fileURLToPath } from "url";

// Mendapatkan __dirname di dalam ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

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
  apis: [path.join(__dirname, "../docs/*.js")],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
