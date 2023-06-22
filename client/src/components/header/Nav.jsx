import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../public/assets/images/logo.png";
import { getTokenUser } from "../../api/Api";
const Nav = ({ cmp }) => {
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("login"));
  const [image, setImage] = useState([])
  useEffect(() => {
    userAlready()
  }, [])
  const userAlready = async () => {
    const values = await getTokenUser(token.token);
    if(values.data.status==200){
      setImage(values.data.user.avatar)
    }
    // console.log(values.data.user.avatar)
  }
  return (
    <div className="home-header-container-nav">
      <div className="home-header-container-nav-left">
        <div className="home-header-container-nav-left__branding">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="home-header-container-nav-right">
        <Link
          className={`${cmp === "home" ? "home-header-container-nav-right--active-menu" : ""
            }`}
          to="/"
        >
          Trang chủ
        </Link>
        <Link
          className={`${cmp === "jobs" ? "home-header-container-nav-right--active-menu" : ""
            }`}
          to="/jobs"
        >
          Tìm việc làm
        </Link>

        <Link

          className={`${
            cmp === "company" ? "home-header-container-nav-right--active-menu" : ""
          }`}
          to="/company"
          >
          Danh sách công ty
        </Link>
        <Link
          className={`${cmp === "blogs"
              ? "home-header-container-nav-right--active-menu"
              : ""
            }`}
          to="/blog"
        >

          Bài đăng
        </Link>
        <Link
          className={`${cmp === "contact"
              ? "home-header-container-nav-right--active-menu"
              : ""
            }`}
          to="/contact"
        >
          Liên hệ
        </Link>
        {token === null ?
          (
            <>
              <Link
                className={`${cmp === "login"
                    ? "home-header-container-nav-right--active-menu"
                    : ""
                  }`}
                to="/loginUser"
              >
                Đăng nhập
              </Link>
              <Link
                className={`${cmp === "login"
                    ? "home-header-container-nav-right--active-menu"
                    : ""
                  }`}
                to="/loginEmployee"
              >
                Dành cho nhà tuyển dụng
              </Link>
            </>
          ) : (
            <Link to={"userProfile"}>
            <img width={50} height={50} style={{ borderRadius: "50px" }} src={`http://127.0.0.1:8000/storage/${image}`} alt="" />
            </Link>
          )
        }
      </div>
    </div>
  );
};

export default Nav;
