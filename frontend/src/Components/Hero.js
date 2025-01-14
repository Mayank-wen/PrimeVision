import React from "react";
import "../css/Hero.css";

const Hero = () => {
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h2>Mavka</h2>
        <p className="hero-genre">Drama | Fantasy</p>
        <p className="mv">
          The already tumultuous and difficult lives of ordinary people in
          Ukraine's countryside are turned upside down by war and revolution.
        </p>
        <div className="buttons">
          <button className="watch-now">Watch Now</button>
          <button className="download">Download</button>
        </div>
      </div>
      <video
        className="hero-video"
        src="https://youtu.be/GXaMT5pX12w"
        autoPlay
        loop
        muted
      ></video>
    </div>
  );
};

export default Hero;
