import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUser, faEnvelopeOpenText, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { Table, Pagination } from "antd";
import { Link } from "react-router-dom";

function Companyad() {
  const [company, setCompany] = useState([]);
  const [endUser,setEndUser]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  useEffect(() => {
    getData();
    getEndUser()
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getData = async () => {
    try {
      const data = await axios.get("http://127.0.0.1:8000/api/getcompanies");
      setCompany(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEndUser = async () => {
    const data = await axios.get("http://127.0.0.1:8000/api/countenduser");
    setEndUser(data.data)
  }
  const getImageUrl = (fileName) => {
    const baseUrl = "http://127.0.0.1:8000/storage/";
    return `${baseUrl}${fileName}`;
  };

  const columns = [
    {
      title: "Công ty",
      dataIndex: "company_name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (logo) => (
        <img
          src={getImageUrl(logo)}
          alt=""
          style={{ width: "45px", height: "45px", borderRadius: "50px" }}
        />
      ),
    },
  ];

  const paginatedData = company.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="table-container">
   
      <div>
        <Table className="card-table" dataSource={paginatedData} columns={columns} />
        
      </div>
    </div>
  );
}

export default Companyad;
