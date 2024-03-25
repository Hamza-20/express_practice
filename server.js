const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware");
const db = require("./config/db");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/players", require("./routes/playerRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
