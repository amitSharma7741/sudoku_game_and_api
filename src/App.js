import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Home from "./Pages/Home/Home"; 

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} /> 
        </Route>
      </Routes>
    </>
  );
};

export default App;
