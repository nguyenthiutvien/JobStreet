import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import TabBar from './TabBar';
import {CompanyInformation} from './CompanyInformation';
import Application from './Application';
import Jobs from './Jobs';



const EmployerProfile = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {Application
    setContent(<Application />);
  }, []);

  const handleInfor = () => {
    setContent(<CompanyInformation />);
  };

  const handleApplication = () => {
    setContent(<Application />);
  };

  const handleJob = () => {
    setContent(<Jobs />);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Đăng xuất',
      text: 'Bạn muốn đăng xuất',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đăng xuất',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('login');
        navigate('/');
      } else {
        navigate('/EmployerProfile');
      }
    });
  };

  return (
    <>
      <div className="container--user--profile">
        <div className="user--profile--left">
          <TabBar handleInfor={handleInfor} handleApplication={handleApplication} handleJob={handleJob} handleLogout={handleLogout} />
        </div>
        <div className="user--profile--content">{content}</div>
      </div>
    </>
  );
};

export default EmployerProfile;
