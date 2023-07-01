import React from "react";
import Hero from "./Hero";
import Nav from "./Nav";
import "../../_style/layout/_header.scss";
const Header = ({cmp}) => {
  return (
    <header className="home-header">
      <div className="home-header-container">
        <Nav cmp={cmp} />
        {/* <Hero /> */}
      </div>
    </header>
  );
};

export default Header;
