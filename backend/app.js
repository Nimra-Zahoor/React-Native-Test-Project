const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const {ALLOWED_ORIGINS} = require("./constants/allowedOrigins")
const { cloudinaryConfig, mongoConfig } = require("./config/config.js");
const cloudinary = require("cloudinary").v2;

const routes = require("./router/index.js");
const port = 8000

cloudinary.config(cloudinaryConfig);

mongoose
  .connect(mongoConfig.connectionString, mongoConfig.connectionOptions)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

app.use(express.json());
app.use( cors());

app.use(
  session({
    secret: "SECRET_KEY",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.send(`Hello from server`);
});

app.use("/api",routes);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
