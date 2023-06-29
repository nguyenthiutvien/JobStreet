import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  Button } from "antd";
import { getTokenCompany } from '../../api/Api';


const TabBar = ({ handleInfor, handleLogout, handleApply, handleJob }) => {
  const [company, setCompany] = useState({});
  const token = JSON.parse(localStorage.getItem('login'));

  useEffect(() => {
    const getInfor = async () => {
      const companyValue = await getTokenCompany(token.token);
      if (companyValue.data.status === 200) {
        setCompany(companyValue.data.company);
      }
    };
    getInfor();
  }, [token.token]);

  return (
    <div>
      <div className="container--tabbar">
        <div className="tabbar--image">
          <div className="image--profile">
            <img src={`http://127.0.0.1:8000/storage/${company.logo}`} alt="" />
          </div>
          <div className="user--name">
            <p>{company.company_name}</p>
          </div>
        </div>
        <div className="tabbar--drop--down">
          <ul>
            <li>
              <Link className="color" to={'/'}>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link className="color" onClick={handleApply}>
                Hồ sơ ứng tuyển
              </Link>
            </li>
            <li>
              <Link className="color" onClick={handleJob}>
                Công việc
              </Link>
            </li>
            <li>
              <Link className="color" onClick={handleInfor}>
                Cập nhật thông tin
              </Link>
            </li>
          </ul>
        </div>
        <Button type="primary" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </div>
    </div>
  );
};

export default TabBar;
