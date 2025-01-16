import express from "express";
import {
  registerUser,
  loginUser,
  userCredit,
  paymentRazorpay,
  verifyPayment,
} from "../controllers/userController.js";
import userAuth from "../middleware/auth.js";

const userRouter = express.Router();
// localhost:5000/api/user/register
userRouter.post("/register", registerUser);
// localhost:5000/api/user/login
userRouter.post("/login", loginUser);
// localhost:5000/api/user/credits
userRouter.get("/credits", userAuth, userCredit);
// localhost:5000/api/user/pay-razorpay
userRouter.post("/pay-razorpay", userAuth, paymentRazorpay);
// localhost:5000/api/user/verify-razorpay
userRouter.post("/verify-payment", verifyPayment);
export default userRouter;
