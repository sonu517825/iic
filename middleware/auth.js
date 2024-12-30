const jwt = require("jsonwebtoken");
const Schema = require("../schema/schema");
async function verifyToken(req, res, next) {
  try {
    const token = req?.header("Authorization")?.split("Bearer")?.[1]?.trim();
    if (!token) return res.status(401).json({ error: "Access denied" });
    const decoded = jwt.verify(token, "abc");
    const user = await Schema.findById({ _id: decoded.id });
    if (!user) return res.status(401).json({ error: "Access denied" });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
