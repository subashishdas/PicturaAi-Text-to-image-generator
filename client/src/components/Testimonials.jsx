import React from "react";
import { testimonialsData } from "../assets/assets";
import { motion } from "framer-motion";
const Testimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-20 py-12"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Testimonials from Our Users
      </h1>
      <p className="text-stone-500 mb-8 text-lg">Hear from our happy users.</p>

      <div className="flex flex-wrap gap-6">
        {testimonialsData.map((item, index) => (
          <div
            key={index}
            className="bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <img src={item.image} alt="" className="rounded-full w-14" />
              <h2 className="text-lg font-semibold mt-3">{item.name}</h2>
              <p className="text-stone-500 mb-4">{item.role}</p>
              <div className="flex mb-4">
                {Array(item.stars)
                  .fill()
                  .map((item, index) => (
                    <span key={index}>⭐</span>
                  ))}
              </div>
              <p className="text-stone-600 text-center text-sm">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
