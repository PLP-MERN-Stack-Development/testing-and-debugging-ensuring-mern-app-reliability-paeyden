const jwt = require('jsonwebtoken');

const JWT_SECRET = 'test-secret'; // For tests only

function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = { generateToken, authMiddleware };
