import React from "react";
import { motion } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";

const Card = ({ id, title, description, image, price }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="relative rounded-3xl bg-gradient-to-br from-white/70 to-blue-50/60 backdrop-blur-2xl 
                 shadow-[0_8px_30px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-500 group border border-white/40"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-5 text-gray-800">
        <h3 className="text-xl font-semibold tracking-wide mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>

        <div className="flex items-center justify-between mt-3 gap-6">
          <span className="text-amber-500 font-bold text-lg drop-shadow-sm">
            ₹{price}
          </span>

          <motion.button
            whileTap={{ scale: 0.95 }}
            // onClick={() => (window.location.href = `/myCardDetail/${id}`)}
            onClick={() => (window.location.href = `/details/${id}`)}
            className="relative overflow-hidden px-5 py-2 rounded-xl font-semibold text-sm tracking-wide 
               bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-md
               hover:shadow-lg hover:from-blue-500 hover:to-indigo-600
               transition-all duration-500 ease-out group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore
              <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-300/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
