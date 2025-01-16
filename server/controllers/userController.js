import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import transactionModel from "../models/Transaction.js";

// Initialize Razorpay instance with error handling
let razorpayInstance;
try {
  razorpayInstance = new Razorpay({
    key_id: "rzp_test_ioY7eZxl0xwgFF",
    key_secret: "ty7QYLh94EFekGzXJsO0ceip",
  });
} catch (error) {
  console.error("Failed to initialize Razorpay:", error.message);
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all details" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, user: { name } });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credential" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const userCredit = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      creditBalance: user.creditBalance,
      user: { name: user.name },
    });
  } catch (err) {
    console.error("Credit check error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const paymentRazorpay = async (req, res) => {
  try {
    // Check if Razorpay is properly initialized
    if (!razorpayInstance) {
      throw new Error("Razorpay configuration is missing");
    }

    const { userId, planId } = req.body;
    if (!userId || !planId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId or planId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const plans = {
      Basic: { credits: 100, amount: 10 },
      Pro: { credits: 300, amount: 25 },
      Enterprise: { credits: 1000, amount: 50 },
    };

    const selectedPlan = plans[planId];
    if (!selectedPlan) {
      return res.status(400).json({ success: false, message: "Invalid plan" });
    }

    const transactionData = {
      userId,
      plan: planId,
      credits: selectedPlan.credits,
      amount: selectedPlan.amount,
      date: Date.now(),
    };

    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: selectedPlan.amount * 100, // Convert to smallest currency unit
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("Payment creation error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create payment order",
      error: err.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      const transactionData = await transactionModel.findById(
        orderInfo.receipt
      );
      if (transactionData.payment) {
        return res
          .status(200)
          .json({ success: false, message: "Payment Failed" });
      }

      const userData = await userModel.findById(transactionData.userId);
      const creditBalance = userData.creditBalance + transactionData.credits;
      await userModel.findByIdAndUpdate(userData._id, { creditBalance });
      await transactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });

      res.status(200).json({ success: true, message: "Credits Added" });
    } else {
      res.status(400).json({ success: false, message: "Payment Failed" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export { registerUser, loginUser, userCredit, paymentRazorpay, verifyPayment };
