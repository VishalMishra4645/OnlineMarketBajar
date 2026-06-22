import React from "react";
import { motion } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FavouriteCard = ({ id, title, description, image, price }) => {

  const navigate = useNavigate();
  
  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-300 group overflow-hidden"
    >
      {/* Image */}
      <div className="relative w-full h-60 overflow-hidden rounded-t-3xl">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 bg-white">
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-4 mb-4">{description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-semibold text-indigo-600 drop-shadow-sm">
            ₹{price}
          </span>

          {/* Explore Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              console.log("Button clicked");
              navigate(`/publicCard/${id}`);
            }}
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

export default FavouriteCard;
