import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Favourites from "./Pages/Favorites";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import PrivateRoute from "./Components/PrivateRoute";
import "./App.css";
import MyMovies from "./Pages/MyMovies";
import NewMovie from "./Pages/NewMovie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route 
            path="favourites" 
            element={<PrivateRoute element={<Favourites />} />}
          />
          <Route 
            path="profile" 
            element={<PrivateRoute element={<Profile />} />} 
          />
          <Route 
            path="MyMovies" 
            element={<PrivateRoute element={<MyMovies />} />} 
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route 
            path="NewMovie" 
            element={<PrivateRoute element={<NewMovie />} />} 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
{/* <Route path="profile" element={<PrivateRoute element={<Profile />} />} /> */}