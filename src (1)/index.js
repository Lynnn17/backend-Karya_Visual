require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const usersRoutes = require("./routes/users.js");
const middleware = require("./middleware/logs.js");

// middeleware
app.use(middleware);
app.use(cors());
app.use(express.json()); //mengizinkan inputan json
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
