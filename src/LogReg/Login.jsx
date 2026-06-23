import React, { useContext, useRef } from "react";
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContect";
import { Easy_URL } from "../environment/api";
import Swal from "sweetalert2";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { setToken } = useContext(StoreContext);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const login = {
    email: emailRef.current.value,
    password: passwordRef.current.value,
  };

  try {
    const loginResponse = await axios.post(
      Easy_URL.login,
      login
    );

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: loginResponse.data.message,
      timer: 1500,
      showConfirmButton: false,
    });

    setToken(true);

    localStorage.setItem("token", loginResponse.data.token);
    localStorage.setItem("userid", loginResponse.data.userid);

    window.dispatchEvent(new Event("userChanged"));

    emailRef.current.value = "";
    passwordRef.current.value = "";

    navigate("/");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text:
        error.response?.data?.message ||
        "Something went wrong",
    });
    if(error.error.message == "invalid Password"){
      passwordRef.current.value = "";
    } else {
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  }
};

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-[#f8faff] via-[#e8f0fe] to-[#fff] px-4 sm:px-6 pt-40">

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/70 backdrop-blur-md border border-gray-200 p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-3"
        >
          Welcome Back 👋
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-center mb-8 text-sm sm:text-base"
        >
          Sign in to your account to continue
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              ref={emailRef}
              placeholder="example@gmail.com"
              className="w-full p-3 rounded-xl bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              ref={passwordRef}
              placeholder="Enter your password"
              className="w-full p-3 rounded-xl bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-600 transition-all"
          >
            <LogIn size={20} />
            Login
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center text-gray-600 text-sm"
        >
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-500 hover:underline font-semibold"
          >
            Register
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
