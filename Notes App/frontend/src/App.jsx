import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { ToastContainer, Bounce } from "react-toastify"; // Import Bounce transition
import { toast } from "react-toastify";

const App = () => {
  return (
    <div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme='dark'
        transition={Bounce} 
      />

      <Router>
        <Routes>
          <Route path='/dashboard' exact element={<Home />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' exact element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
