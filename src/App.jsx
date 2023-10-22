import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Favorite from "./Pages/Favorite/Favorite";
import Searched from "./Pages/Searched/Searched";
import Recipe from "./Pages/Recipe/Recipe";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import './App.css'

const App = () => {
  return (
    <div className= 'main'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/recipe/:name" element={<Recipe />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      
    </div>
  );
};

export default App;
