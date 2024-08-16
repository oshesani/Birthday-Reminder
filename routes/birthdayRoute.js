const express = require('express');
const { addBirthday } = require('../controllers/birthdayController.js');
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler.js")




router.post('/add-birthday', validateToken, addBirthday);


module.exports = router;
