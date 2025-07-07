import express from "express";
import {
  loginWithPassword,
  loginWithOrderId,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login-password", loginWithPassword);
router.post("/login-orderid", loginWithOrderId);

export default router;
