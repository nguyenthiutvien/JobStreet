import React from "react";
import heroImage from "../../../public/assets/images/hero.svg";

const Hero = () => {
  return (
    <div className="home-header-container-hero">
      <div className="home-header-container-hero__left">
        <h1>Job Street</h1>
        <h1>That's Fits your life</h1>
       
        <div className="home-header-container-hero__left-search">
          <input
            type="text"
            className="home-header-container-hero__left-search__form"
            placeholder="Find your desired job"
          />
        
        </div>
      </div>
      <div className="home-header-container-hero__right">
        <img src={heroImage} alt="hero img" />
      </div>
    </div>
  );
};

export default Hero;

