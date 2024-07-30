const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { logger, logError, logInfo, logWarning } = require('./utils/logger');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Routes
const app = express();
const cors = require("cors");
const logsRoute = require('./routes/loggerRoute');


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/logs', logsRoute);


// Database Connection with MongoDB
const uri =
  "mongodb+srv://nancygupta1403:mongo1466@cluster0.acui1ho.mongodb.net/e-commerce";

mongoose
  .connect(uri)
  .then(() => console.log("Database connected!"))
  .catch((error) => console.error("Database connection error:", error));
  
app.get('/', (req, res) => {
    logError("here is error", req, res, 500);
    logInfo("here is info", req, res, 200);
    logWarning("here is warning", req, res, 400);
    res.status(200).send("started");
});

// Schema for creating user model
const Users = mongoose.model("Users", {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    date: { type: Date, default: Date.now() },
  });

// creating endpoint for user login
app.post("/login", async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      const passCompare = req.body.password === user.password;
      if (passCompare) {
        const data = {
          user: {
            id: user.id,
          },
        };
        const token = jwt.sign(data, "secret_ecom");
        res.json({ success: true, token });
      } else {
        res.json({ success: false, errors: "Wrong Password" });
      }
    } else {
      res.json({ success: false, errors: "Wrong Email Id" });
    }
  });
  
  //Create an endpoint at ip/auth for regestring the user & sending auth-token
  
  app.post("/signup", async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.json({
        success: false,
        errors: "existing user found with same email address",
      });
    }

    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
  
    await user.save();
  
    const data = {
      user: {
        id: user.id,
      },
    };
  
    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, token });
  });

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))