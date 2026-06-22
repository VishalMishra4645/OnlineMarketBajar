import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom'
import Navbar from './Pages/Navbar'
import Home from './Pages/Home'
import AddItems from './Pages/AddItems'
import View from './Pages/View'
import Login from './LogReg/Login'
import Register from './LogReg/Register'
import Favorite from './Pages/Favorite'
import Details from './Pages/Details';
import MyCard from './Pages/MyCard';
import PublicCard from './Components/PublicCard';
import ProtectedRouter from './Context/ProtectedRouter';
import { Toaster } from "react-hot-toast";

const App = () => {
  return (

    <>
  <Navbar />

  {/* <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
      style: {
        background: "#1f2937",
        color: "#fff",
        borderRadius: "12px",
      },
    }}
  /> */}

  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Home />} />
    <Route path="/view" element={<View />} />

    <Route element={<ProtectedRouter />}>
      <Route path="/addCard" element={<AddItems />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/myCard" element={<MyCard />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/publicCard/:id" element={<PublicCard />} />
    </Route>
  </Routes>
</>

  )
}

export default App