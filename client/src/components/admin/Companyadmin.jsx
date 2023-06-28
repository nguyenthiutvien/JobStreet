import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Table, Pagination } from "antd";
import { Link } from "react-router-dom";

function Companyad() {
  const [company, setCompany] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  useEffect(() => {
    getData();
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
      <Table dataSource={paginatedData} columns={columns} />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={company.length}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default Companyad;
