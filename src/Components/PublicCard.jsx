import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, ShoppingCart, CreditCard, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import API_URL from '../environment/api'

const PublicCard = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("userid");
  const [isFavourite, setIsFavourite] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/detail/${id}`);
      setItem(res.data.data);
      console.log(res.data.data);
      
    } catch (error) {
      console.log("Error fetching items", error);
    }
  };

  const handleRemoveProduct = async (id) => {
    try {
      const response = await axios.post(
        `${API_URL}/product/public/${id}`,

        { status: "private" }
      );
      
      navigate("/myCard")
      
    } catch (error) {
      console.log("Error adding to public", error.response?.data || error);
    }
  };

 const handleFavourite = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/product/addTofavourite`,
        {
          productId: item._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      console.log(item._id);
      

       if (res.data.success == true) {
        setIsFavourite(true);
        checkFavourite();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

const handleRemoveFavourite = async () => {
  try {
    await axios.post(
      `${API_URL}/product/removeFavourite`,
      {
        productId: item._id,
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
    );

    setIsFavourite(false);
  } catch (error) {
    console.log("Error removing favourite", error);
  }
};

const toggleFavourite = () => {
  if (isFavourite) {
    handleRemoveFavourite();
  } else {
    handleFavourite();
  }
};

const checkFavourite = async () => {
  try {
    const res = await axios.post(
      `${API_URL}/product/isfavourite`,
      {
        productId: item._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setIsFavourite(res.data.isFavourite);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchItems();
  }, [id]);

  useEffect(() => {
    if (item && item._id) {
      checkFavourite();
    }
  }, [item]);

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
        {/* Left Image Section */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-50 rounded-l-3xl overflow-hidden relative">
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
            onClick={toggleFavourite}
            className="absolute top-5 right-5 p-3 rounded-full bg-white shadow-lg"
          >
            <Heart
              size={22}
              className={`transition-all duration-300 ${
                isFavourite
                  ? "fill-red-500 text-red-500"
                  : "fill-transparent text-red-500"
              }`}
            />
          </motion.button>
        </div>

        {/* Right Info Section */}
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
            {/* Add to Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm 
                         bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-400 hover:to-indigo-400 
                         transition-all duration-300 shadow-md"
            >
              <ShoppingCart size={18} /> Add to Cart
            </motion.button>

            {/* Buy Now */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm 
                         bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:from-yellow-300 hover:to-orange-300 
                         transition-all duration-300 shadow-md"
            >
              <CreditCard size={18} /> Buy Now
            </motion.button>

            {/* Remove Button */}
            {item.owner === currentUserId && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRemoveProduct(item._id)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm 
                          bg-gradient-to-r from-rose-500 to-red-500 text-white hover:from-rose-400 hover:to-red-400 
                          transition-all duration-300 shadow-md"
              >
                <Trash2 size={18} /> Remove
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PublicCard;
