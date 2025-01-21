import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swaggerConfig.js";
import ClientError from "./exception/clientError.js";
import middleware from "./middleware/logs.js";

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(middleware);
app.use(
  cors({
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/auth", authRoute);
app.use("/users", userRoute);

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode || 400).json({
      status: "fail",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    // ubah saat di production
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
