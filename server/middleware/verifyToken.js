const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    // 1. Get the Authorization header
    const authHeader = req.headers.authorization;

    // 2. Check header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // 3. Extract just the token part (remove "Bearer ")
    const token = authHeader.split(' ')[1];

    // 4. Verify the token using our JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach decoded user info to the request object
    req.user = decoded; // { id, role }

    // 6. Move on to the next middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;