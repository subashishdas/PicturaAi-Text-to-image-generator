import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Transform Imagination into Art
      </h1>
      <p className="text-stone-500 mb-8 text-lg">
        Turn text into visuals instantly.
      </p>

      <div className="flex flex-col gap-5 md:flex-row md:gap-14 items-center">
        <img
          className="w-80 xl:w-96 rounded-lg "
          src={assets.sample_img_1}
          alt=""
        />
        <div className="text-center">
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            Instant Art, Unlimited Possibilities
          </h2>
          <p className="text-stone-600 mb-4">
            Imagine, type, and create. Pictura AI turns your text into stunning
            visuals with the power of advanced AI technology. Perfect for
            content creators, designers, and anyone looking to bring their ideas
            to life, our platform makes creativity accessible to everyone.
          </p>
          <p className="text-stone-600">
            With Pictura AI, transforming your thoughts into visuals is as easy
            as typing a sentence. Powered by advanced AI, our platform is
            designed to help you create captivating images in no time. Whether
            it’s for work, art, or fun, Pictura AI makes it simple, fast, and
            incredibly creative.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
