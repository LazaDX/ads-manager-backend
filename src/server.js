const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../src/config/dbConnection");
const errorHandler = require("../src/middlewares/errorHandler");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

dotenv.config();

connectDB();

const port = process.env.PORT || 5001;

app.use(express.json());

app.use("/campaigns", require("../src/routes/campaignRoute"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Le serveur marche sur le port ${port}`);
});
