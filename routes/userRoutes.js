const express = require("express")
const {registerUser, loginUser} = require("../controllers/userController")
const router = express.Router();
const  {registerSchema , loginSchema} = require("../validators/userValidators")
const validateRequest = require("../middleware/validateRequest");



router.post("/register",validateRequest(registerSchema),registerUser);

router.post("/login",validateRequest(loginSchema), loginUser);

module.exports = router;