import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/signup/signup";
import Login from "./components/login/login";
import Nav from "./common/nav";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
