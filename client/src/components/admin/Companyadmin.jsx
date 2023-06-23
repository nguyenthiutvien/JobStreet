import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Table } from "antd";
function Companyad(){
    const [company , setCompany]= useState([]);
    useEffect(()=>{
        getData();
    },[]);


    const getData=async()=>{
        try {
            const data = await axios.get('http://127.0.0.1:8000/api/getcompanies')
            setCompany(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getImageUrl = (fileName) => {
      const baseUrl = 'http://127.0.0.1:8000/storage/'; // Thay đổi đường dẫn cơ sở theo địa chỉ thư mục chứa ảnh của bạn
      return `${baseUrl}${fileName}`;
    };

    const columns = [
      {
          title: "Công ty",
          dataIndex: "company_name",
          key: "name"
      }, {
          title: "Email",
          dataIndex: "email",
          key: "email"
      },
      {
          title: "Địa chỉ",
          dataIndex: "address",
          key: "address"
      },
      {
          title: "Logo ",
          dataIndex: "logo",
          key: "logo",
          render: (logo) => <img src={getImageUrl(logo)} alt="" style={{ width: '50px', height: '50px',borderRadius:"50px" }} />,
      }
  ]
     //  delete//
    //  function deleteCompany(id) {
    //   fetch(`http://127.0.0.1:8000/api/deleteCompany/${id}`, {
    //     method: "DELETE",
    //   })
    //     .then((result) => {
    //       result.json().then((resp) => {
    //         Swal.fire("Thành công", "xóa sản phẩm thành công", "success");
    //         console.warn(resp);
    //         getData();
    //       });
    //     })
    //     .catch((error) => {
    //       console.error("Error deleting company:", error);
    //     });
    // }

    return (
        <div  className="table-container">

        <h2>ADMIN</h2>
        <Table dataSource={company} columns={columns}></Table>
          {/* <table className="table custom-table table-bordered">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Avatar</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {company.map((data) => (
                <tr key={data.id}>
                  <td>{data.company_name}</td>
                  <td>{data.email}</td>
                  <td>{data.password}</td>
                  <td>{data.address}</td>
                  <td>{data.number_phone}</td>
                  <td><img src={data.logo}/></td>
                  <td><button onClick={() => deleteCompany(data.id)} className="btn btn-danger">X</button> </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      );
}
export default Companyad