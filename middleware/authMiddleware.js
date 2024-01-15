const jwt = require("jsonwebtoken");
const env = require("../config/env");

// Authenticator middleware
const authenticator = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;

  // Check if token exists
  const token = authHeader?.split(" ")[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify token
  jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Add userId to req object
    req.userId = decoded.userId;
    // Proceed to next middleware
    next();
  });
};

module.exports = authenticator;
