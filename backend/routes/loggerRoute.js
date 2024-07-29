const express = require("express");
const router = express.Router();
const loggerController= require("../controllers/loggerController.js");

router.get("/get-all", loggerController.logs);

module.exports = router;
