import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };
  const Navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-center pb-16"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold py-6 md:py-16">
        Type, Generate, Create"
      </h1>
      <button
        onClick={handleClick}
        className="bg-pink-600 text-white w-auto px-12 py-3 rounded-full hover:scale-105 transition-all duration-700"
      >
        Generate Images Now
      </button>
    </motion.div>
  );
};

export default GenerateBtn;
