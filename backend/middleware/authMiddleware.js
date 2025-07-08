import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Guest token support
      if (decoded.guest && decoded.orderId) {
        req.user = {
          guest: true,
          orderId: decoded.orderId,
        };
        return next();
      }

      // ✅ Normal user
      const user = await User.findById(decoded.userId || decoded.id).select("-password");
      if (!user) throw new Error("User not found");

      req.user = user;
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token", error: err.message });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};

export default protect;
