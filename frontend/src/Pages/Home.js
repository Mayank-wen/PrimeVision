import React, { useEffect } from "react";
import Hero from "../Components/Hero";
import Header from "../Components/Header";
import Suggestions from "../Components/Suggestions";
const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <>
          {" "}
          <Header/>
          <Hero />
          <Suggestions />
        
    </>
  );
};

export default Home;
