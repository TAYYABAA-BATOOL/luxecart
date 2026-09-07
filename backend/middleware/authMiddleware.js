const jwt = require('jsonwebtoken');

// 1. Verify Token (Check if user is logged in)
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided!' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // { id, email, role }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token!' });
  }
};

// 2. Verify Admin (Check if user is admin)
exports.verifyAdmin = (req, res, next) => {
  exports.verifyToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Admin only!' });
    }
  });
};