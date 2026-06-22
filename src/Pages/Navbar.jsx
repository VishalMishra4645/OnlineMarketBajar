import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  PlusSquare,
  Eye,
  Heart,
  LogIn,
  UserPlus,
  Menu,
  X,
  LogOut,
  List,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState(null);

  const updateUser = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    setUserName(null);
    return;
  }

  try {
    // check proper JWT format
    if (token.split(".").length !== 3) {
      throw new Error("Invalid token format");
    }

    const decoded = jwtDecode(token);
    console.log(decoded);

    setUserName(decoded.name);
  } catch (error) {
    console.log("Invalid token detected");
    localStorage.removeItem("token");
    setUserName(null);
  }
};

  useEffect(() => {
    updateUser();
    window.addEventListener("userChanged", updateUser);
    return () => window.removeEventListener("userChanged", updateUser);
  }, []);

  const logout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("userChanged"));
    navigate("/");
  };
  
  const centerLinks = token
    ? [
        { to: "/", label: "Home", icon: Home },
        { to: "/addCard", label: "Add Items", icon: PlusSquare },
        { to: "/view", label: "View", icon: Eye },
        { to: "/favorite", label: "Favorites", icon: Heart },
        { to: "/myCard", label: "My Card", icon: List },
      ]
    : [
        { to: "/", label: "Home", icon: Home },
        { to: "/view", label: "View", icon: Eye },
      ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
          {/* ===== Left: Logo ===== */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent tracking-wide"
          >
            {userName ? `${userName}` : "Dynamic Path"}
          </motion.h1>

          {/* ===== Center: Navigation Links ===== */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
            {centerLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    to={item.to}
                    className="flex items-center gap-2 text-gray-700 font-semibold hover:text-blue-600 transition-all no-underline"
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ===== Right: Auth Buttons ===== */}
          <div className="hidden md:flex items-center gap-6">
            {token ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <LogOut size={18} /> Logout
              </motion.button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 text-white font-semibold hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-2">
                    <LogIn size={18} /> Sign In
                  </div>
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-2">
                    <UserPlus size={18} /> Sign Up
                  </div>
                </Link>
              </>
            )}
          </div>

          {/* ===== Mobile Menu Button ===== */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* ===== Mobile Sidebar ===== */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="fixed top-0 left-0 h-full w-72 bg-white/90 backdrop-blur-2xl shadow-2xl z-50 flex flex-col p-6 border-r border-gray-200"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                  Menu
                </h2>
                <button onClick={() => setMenuOpen(false)}>
                  <X size={28} className="text-gray-700" />
                </button>
              </div>

              <ul className="flex flex-col gap-5 text-lg font-medium text-gray-700">
                {centerLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 hover:text-blue-600 transition-all"
                    >
                      <Icon size={20} /> {item.label}
                    </Link>
                  );
                })}
              </ul>

              <div className="mt-auto flex flex-col gap-3">
                {token ? (
                  <button
                    onClick={logout}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:shadow-lg transition-all"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 text-white font-semibold hover:shadow-lg transition-all"
                    >
                      <LogIn size={18} /> Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all"
                    >
                      <UserPlus size={18} /> Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
