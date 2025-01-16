import React, { useContext } from "react";
import StarIcon from "../assets/starIcon.svg";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col justify-center items-center text-center my-20 "
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.9 }}
        className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-2 rounded-full border border-neutral-500"
      >
        <p>Best text to image generator</p>
        <img src={StarIcon} alt="" className="w-4" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center"
      >
        From Text to <span className="text-pink-700">Artwork</span> in No Time.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9 }}
        className="text-center max-w-xl mx-auto mt-5 text-stone-600"
      >
        Bring your ideas to life in moments with our powerful text-to-image AI.
        Simple, fast, and creative.
      </motion.p>

      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 0.8, duration: 0.9 },
        }}
        className="sm:text-lg bg-pink-600 text-white w-auto px-12 py-2.5 rounded-full hover:scale-105 transition-all duration-700 mt-8"
      >
        Get Started
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.9 }}
        className="flex flex-wrap justify-center items-center gap-4 mt-10"
      >
        {Array(6)
          .fill("")
          .map((item, index) => (
            <motion.img
              whileHover={{ scale: 1.1, duration: 0.1 }}
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointers max-sm:w-10"
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              alt=""
              key={index}
              width={70}
            />
          ))}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.9 }}
        className="text-sm text-stone-500 mt-2"
      >
        Generated images from Pictura AI
      </motion.p>
    </motion.div>
  );
};

export default Header;
