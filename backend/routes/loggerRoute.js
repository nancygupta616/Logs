const express = require("express");
const router = express.Router();
const loggerController= require("../controllers/loggerController.js");
const authMiddleware = require("../utils/authMiddleware.js");

router.get("/get-all", authMiddleware, loggerController.logs);

module.exports = router;
