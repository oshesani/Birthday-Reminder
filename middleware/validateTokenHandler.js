const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "User is not Authorized" });
            }
            req.user = decoded.user;
            console.log("User from token:", req.user);
            next(); 
        });
    } /*else {
        return res.status(401).json({ message: "User is not authorized or token is missing" });
    }*/
});

module.exports = validateToken;



