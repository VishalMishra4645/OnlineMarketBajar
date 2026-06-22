import React, { useRef, useContext } from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContect";
import API_URL from '../environment/api'

const Register = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { setToken } = useContext(StoreContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(
        `${API_URL}/signUp/register`,
        registerData
      );

      localStorage.setItem("token", response.data.token);
      setToken(true);
      window.dispatchEvent(new Event("userChanged"));
      navigate("/login");

      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-[#f8faff] via-[#e8f0fe] to-[#fff] px-4 sm:px-6 pt-40">
      
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-200 p-8 sm:p-10 rounded-3xl shadow-lg"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-2"
        >
          Create Your Account
        </motion.h1>

        <p className="text-gray-500 text-center mb-8 text-sm sm:text-base">
          Join us today and explore more!
        </p>

        {/* Register Form */}
        <motion.form
          onSubmit={handleRegister}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-5"
        >
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              ref={nameRef}
              placeholder="John Doe"
              required
              className="w-full p-3 rounded-xl bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              ref={emailRef}
              placeholder="example@email.com"
              required
              className="w-full p-3 rounded-xl bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              ref={passwordRef}
              placeholder="••••••••"
              required
              className="w-full p-3 rounded-xl bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-500 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-600 transition-all"
          >
            <UserPlus size={20} />
            Register
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-gray-600 text-sm"
        >
          Already registered?{" "}
          <a
            href="/login"
            className="text-indigo-500 hover:underline font-medium"
          >
            Login
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Register;
