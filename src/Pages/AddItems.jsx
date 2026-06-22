import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import API_URL from '../environment/api'

const AddItems = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productToEdit = location.state;

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (productToEdit && Object.keys(productToEdit).length > 0) {
      setIsEditMode(true);
      setTitle(productToEdit.title || "");
      setDesc(productToEdit.desc || "");
      // setImage(productToEdit.image || "");
      setPrice(productToEdit.price || "");
    }
  }, [productToEdit]);

  const productSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("title", title);
  formData.append("desc", desc);
  formData.append("price", price);
  if (image) {
    formData.append("image", image);
  }

  try {
    await axios.post(
      `${API_URL}/product/addcard`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    navigate("/myCard");
  } catch (error) {
    console.log(error.response?.data);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 flex items-center justify-center px-4 sm:px-6 pt-20 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-lg"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-serif tracking-wide drop-shadow-md text-center text-indigo-700 mb-8"
        >
          {isEditMode ? "Edit Product" : "Add New Item"}
        </motion.h1>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
          onSubmit={productSubmit}
        >
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Title:</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Description:
            </label>
            <input
              type="text"
              placeholder="Enter description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-4 py-2 rounded-lg bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">Price:</label>
            <input
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-bold rounded-lg shadow-md hover:bg-indigo-400 transition"
          >
            {isEditMode ? "Update" : "Submit"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AddItems;
