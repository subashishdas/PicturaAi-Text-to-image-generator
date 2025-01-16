import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }
  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecoded.id) {
      req.body.userId = tokenDecoded.id;
    } else {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    next();
  } catch (err) {
    console.log();
    res.json({ success: false, message: err.message });
  }
};

export default userAuth;
