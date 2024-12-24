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
        src="https://imdb-video.media-imdb.com/vi3494298905/1434659607842-pgv4ql-1676535573518.mp4?Expires=1735104222&Signature=CfO61PfupfytzJyvODtkNxSpxZSgOIurrDV36A-Uo8ujgrOE-ayoCGzj3SyqrJO0SdwRcavrW4mBqGDRSvu~L6BWWq0l4peXSggONTt2ced6zCU~sFhPi5D4lhhZXL9gHxwfs3baFCvR0Il7GC-hCWxB8pqKuTvS1r6TZxC1nS3s1hW~QvzjHF0LLerppWVAdBX5rfxNdoJ-NYgZ~AHvBz6hWW9MsTgC~Fs3cVHpbw-vPVg8hSfXCpXTPAS4kaXJ6KI6ZtPNvdWUrWy4h1lVthVKWxrJ3VBbjGHA5RI-6WUWArxyatwZaF1TOh8CT9Qg3fgAnBls6k4dqrTRqnHFGg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
        autoPlay
        loop
        muted
      ></video>
    </div>
  );
};

export default Hero;
