import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, Edit3, Trash2, Globe } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import API_URL from '../environment/api'

const Details = () => {
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

  const handleDelete = async (id) => {
    try {
      await axios.get(`${API_URL}/product/delete/${id}`);
      setItem((prev) => prev.filter((p) => p._id !== id));
      navigate("/myCard");
    } catch (error) {
      console.log("Error deleting item", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/product/edit/${id}`);
      navigate("/addCard", { state: res.data });
    } catch (error) {
      console.log("Error fetching edit data", error);
    }
  };

  const handleAddToPublic = async (id) => {
    try {
      const response = await axios.post(
        `${API_URL}/product/public/${id}`,
        {
          status: "public",
        }
      );
      alert("Product successfully added to Public!");
    } catch (error) {
      console.log("Error adding to public", error.response.data);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [id]);

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-[#f6f8fb] via-[#eef2f9] to-[#ffffff] p-8 pt-20 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-5 flex flex-col md:flex-row max-w-5xl w-full bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl 
                   overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500"
        style={{ minHeight: "520px" }}
      >
        {/* Left Image */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-50 rounded-l-3xl overflow-hidden">
          <motion.img
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            src={item.image}
            alt={item.title}
            className="max-h-[520px] w-auto object-contain"
          />

          {/* Heart Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-5 right-5 bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-rose-500 hover:text-white 
               transition-all duration-300 shadow-lg"
          >
            <Heart size={22} className="text-rose-500 hover:text-white" />
          </motion.button>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 w-full flex flex-col justify-between p-8">
          {/* Title + Description */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[360px] pr-1">
            <h1 className="text-4xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
              {item.title}
            </h1>

            <p className="text-gray-600 leading-relaxed text-lg overflow-y-auto">
              {item.desc}
            </p>

            <p className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-600 mt-4">
              ₹ {item.price}
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex items-center justify-between gap-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEdit(id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm 
                         bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-400 hover:to-indigo-400 
                         transition-all duration-300 shadow-md"
            >
              <Edit3 size={18} /> Edit
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDelete(id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm 
                         bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:from-yellow-300 hover:to-orange-300 
                         transition-all duration-300 shadow-md"
            >
              <Trash2 size={18} /> Delete
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddToPublic(id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm 
                         bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 text-white hover:from-fuchsia-400 hover:to-pink-400 
                         transition-all duration-300 shadow-md"
            >
              <Globe size={18} /> Public
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Details;
