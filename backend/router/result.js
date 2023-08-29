const express = require("express");
const router = express.Router();
const {getAllResults} = require("../controllers/calculateResultController");
const {calculateResults} = require("../controllers/calculateResultController");

const authenticateUserByToken = require("../middleware/authenticate");

router.get("/constituency", authenticateUserByToken, calculateResults);
router.get("", authenticateUserByToken, getAllResults); 

module.exports = router;
