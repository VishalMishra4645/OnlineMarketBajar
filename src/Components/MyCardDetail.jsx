import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, ShoppingCart, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import API_URL from '../environment/api'

const MyCardDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/detail/${id}`);
      setItem(res.data.data);
    } catch (error) {
      console.log("Error fetching items", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [id]);

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-[#f6f8fb] via-[#eef2f9] to-[#ffffff] p-8 pt-20 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-5 flex flex-col md:flex-row max-w-5xl w-full bg-white/80 backdrop-blur-lg border border-gray-200 
                   rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.08)] transition-shadow duration-500"
        style={{ minHeight: "520px" }}
      >
        {/* Left Side: Image */}
        <div className="md:w-1/2 w-full relative overflow-hidden">
          <motion.img
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover rounded-l-3xl"
          />

          {/* Heart Favorite */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-5 right-5 bg-white/80 backdrop-blur-md p-3 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-lg"
          >
            <Heart size={22} className="text-rose-500 hover:text-white" />
          </motion.button>
        </div>

        {/* Right Side: Info */}
        <div className="md:w-1/2 w-full p-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
            {item.title}
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed text-lg">
            {item.desc}
          </p>

          <p className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 mb-10">
  ₹ {item.price}
</p>

          {/* Buttons: Add to Cart / Buy Now */}
          <div className="flex flex-wrap gap-6">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(59,130,246,0.25)",
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm 
                         bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-400 hover:to-indigo-400
                         transition-all duration-300 shadow-md"
            >
              <ShoppingCart size={20} /> Add to Cart
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(255,182,72,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm 
                         bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:from-yellow-300 hover:to-orange-300
                         transition-all duration-300 shadow-md"
            >
              <CreditCard size={20} /> Buy Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MyCardDetails;
