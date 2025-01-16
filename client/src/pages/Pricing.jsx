import React, { useContext } from "react";
import { CreditCard, Check, Sparkles } from "lucide-react";
import { plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Pricing = () => {
  const { user, backendUrl, loadCreditData, token, setShowLogin } =
    useContext(AppContext);
  const navigate = useNavigate();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-payment",
            res,
            { headers: { token } }
          );
          if (data.success) {
            loadCreditData();
            navigate("/");
            toast.success("Payment Successful");
          }
        } catch (err) {
          toast.error(err.message);
        }
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handlePayment = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/pay-razorpay",
        { planId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="text-center mb-8 sm:mb-16">
        <div className="inline-flex items-center gap-2 bg-white px-4 sm:px-6 py-2 rounded-full shadow-sm border border-gray-100 mb-4 sm:mb-6">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span className="text-sm sm:text-base text-gray-600 font-medium">
            Our Plans
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Choose Your Perfect Plan
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
          Get started with AI-powered image generation today. Choose the plan
          that best fits your needs.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 ${
              index === 1
                ? "border-2 border-pink-500"
                : "border border-gray-100"
            }`}
          >
            {index === 1 && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
            )}

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-pink-50">
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  {plan.id}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-gray-600 mb-6">
                {plan.desc}
              </p>

              <div className="mb-6 sm:mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-sm sm:text-base text-gray-500">
                    /{plan.credits} credits
                  </span>
                </div>
              </div>

              <button
                onClick={() => handlePayment(plan.id)}
                className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
                  index === 1
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
                    : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                }`}
              >
                {user ? "Purchase Now" : "Get Started"}
              </button>

              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-600">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Pricing;
