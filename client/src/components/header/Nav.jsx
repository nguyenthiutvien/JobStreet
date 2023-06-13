import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../public/assets/images/logo.png";

const Nav = ({ cmp }) => {
  const location = useLocation();
  return (
    <div className="home-header-container-nav">
      <div className="home-header-container-nav-left">
        <div className="home-header-container-nav-left__branding">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="home-header-container-nav-right">
        <Link
          className={`${
            cmp === "home" ? "home-header-container-nav-right--active-menu" : ""
          }`}
          to="/"
        >
          Trang chủ
        </Link>
        <Link
          className={`${
            cmp === "jobs" ? "home-header-container-nav-right--active-menu" : ""
          }`}
          to="/jobs"
        >
          Tìm việc làm
        </Link>
        
        <Link
          className={`${
            cmp === "company" ? "home-header-container-nav-right--active-menu" : ""
          }`}
          to="/jobs"
        >
          Danh sách công ty
        </Link>
        <Link
          className={`${
            cmp === "blogs"
              ? "home-header-container-nav-right--active-menu"
              : ""
          }`}
          to="/blogs"
        >
          
          Bài đăng
        </Link>
        <Link
          className={`${
            cmp === "contact"
              ? "home-header-container-nav-right--active-menu"
              : ""
          }`}
          to="/contact"
        >
          Liên hệ
        </Link>
        <Link
          className={`${
            cmp === "login"
              ? "home-header-container-nav-right--active-menu"
              : ""
          }`}
          to="/loginUser"
        >
          Đăng nhập
        </Link>

        <Link
          className={`${
            cmp === "login"
              ? "home-header-container-nav-right--active-menu"
              : ""
          }`}
          to="/loginEmployee"
        >
          Dành cho nhà tuyển dụng
        </Link>

       
      </div>
    </div>
  );
};

export default Nav;
