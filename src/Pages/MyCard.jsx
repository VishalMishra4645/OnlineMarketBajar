import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Card from "./Card";
import { Link } from "react-router-dom";
import API_URL from '../environment/api'

const MyCard = () => {
  const [cards, setCards] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/product/getProductsById`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = res.data.viewCard;
      setCards(result);
    } catch (error) {
      console.log("Error fetching items", error.response.data);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 flex flex-col px-4 sm:px-6 py-10">
      {/* Page Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-10"
      >
        Your Items
      </motion.h2>

      {cards.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center flex-grow"
        >
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 sm:p-10 max-w-md border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
              No Items Found
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              You haven’t added anything yet. Add your first item!
            </p>
            <Link to="/addCard" className="no-underline">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-400 transition shadow-lg hover:shadow-2xl"
              >
                Add New Item
              </motion.button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 1, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              <Card
                id={card._id}
                title={card.title}
                description={card.desc}
                image={card.image}
                price={card.price}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyCard;
