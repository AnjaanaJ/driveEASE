const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Make sure verifyToken already ran and attached req.user
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, no user found' });
    }

    // 2. Check if the user's role is in the list of allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }

    // 3. Role is allowed, continue
    next();
  };
};

module.exports = requireRole;