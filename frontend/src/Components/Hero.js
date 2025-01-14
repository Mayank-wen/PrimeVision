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
        src="https://imdb-video.media-imdb.com/vi3494298905/1434659607842-pgv4ql-1676535573518.mp4?Expires=1736914700&Signature=IVoXd31w~7UtGslwAHWC03syoivh2nmAPWD6dxoEGbR52FWZSS-sQ400ESHT~p8oP1OrWCbUU~JFsKOaisih7rJU0MpNRsauUdgU4BwsSMiGcKdY8KMZlkeQAvMw1z4hEh5pOcgnAj8Gj-jrguK6xDKyPixE5KxXNNiTklIhx3vC83wkl~EDIu66COd9YJ6JvFJ3qyQ9W7GhfYbGmGGZmzfiJ6voztO3JBzR7np8Yb9OJPkvl27p4Viu5p8oid2PPLRm5RkNtU0ekzHwCznunemdd8WFEwkLbddGsrQAzFMMX94f1-UT7i7iZZxPhaOA0tyOfVIA3Es-OsAixjfFhw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
        autoPlay
        loop
        muted
      ></video>
    </div>
  );
};

export default Hero;
