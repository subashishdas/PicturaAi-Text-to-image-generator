import React, { useContext, useState } from "react";
import { Camera, Download, RefreshCw } from "lucide-react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const { generateImage } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      const generatedImage = await generateImage(input);
      if (generatedImage) {
        const generatedImage = await generateImage(input);
        if (generatedImage) {
          setImage(generatedImage);
          setIsImageLoaded(true);
        }
      }
      setLoading(false);
    }
  };
  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="flex flex-col min-h-[90vh] justify-center items-center gap-8 p-6 md:px-28"
    >
      <div className="">
        {/* Image Container */}
        <div className="relative">
          <img
            src={image}
            alt="Generated content"
            className="max-w-sm rounded"
            style={{ maxHeight: "600px" }}
          />
          {/* Loading Progress Bar */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 transform origin-left transition-transform duration-[10s] ${
              loading ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        {/* Loading Text */}
        <div className={`text-center mt-4 ${!loading ? "hidden" : ""}`}>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            Generating your image...
          </p>
        </div>
      </div>

      {!isImageLoaded ? (
        <div className="w-full max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe what you want to generate..."
              className="w-full px-6 py-4 pr-36 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-white text-gray-800 placeholder-gray-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md"
            >
              <Camera className="w-4 h-4" />
              Generate
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setIsImageLoaded(false)}
            className="px-6 py-3 rounded-full border border-gray-300 hover:border-gray-400 transition-colors flex items-center gap-2 text-gray-700"
          >
            <RefreshCw className="w-4 h-4" />
            Generate Another
          </button>
          <a
            href={image}
            download
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
