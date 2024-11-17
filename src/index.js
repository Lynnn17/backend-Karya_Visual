require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./config/swaggerConfig");

const usersRoutes = require("./routes/userRoute.js");
const authRoutes = require("./routes/authRoute.js");
const transaksiRoutes = require("./routes/transaksiRoute.js");
const blogRoutes = require("./routes/blogRoute.js");
const middleware = require("./middleware/logs.js");

app.use(middleware);
app.use(
  cors({
    origin: "http://localhost:4000", // Ganti dengan domain aplikasi frontend Anda
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Membolehkan cookies dikirim
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/transaksi", transaksiRoutes);
app.use("/blog", blogRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
