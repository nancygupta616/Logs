const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { logger, logError, logInfo, logWarning } = require('./utils/logger');

// Routes
const app = express();
const cors = require("cors");
const logsRoute = require('./routes/loggerRoute');


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/logs', logsRoute);


app.get('/', (req, res) => {
    logError("here is error", req, res, 500);
    logInfo("here is info", req, res, 200);
    logWarning("here is warning", req, res, 400);
    res.status(200).send("started");
});


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))