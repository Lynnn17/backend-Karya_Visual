require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const usersRoutes = require("./routes/userRoute.js");
const middleware = require("./middleware/logs.js");
const authRoutes = require("./routes/authRoute.js");
const cookieParser = require("cookie-parser");
const upload = require("./middleware/uploadMiddleware");
const { createNewUser } = require("./controllers/userControllers.js");

require("./routes/transaksiRoute.js")(app);

app.use(middleware);
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", upload.single("foto"), createNewUser);

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
