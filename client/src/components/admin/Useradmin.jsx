import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Table } from "antd";
function Userad(){
    const [users, setUsers]= useState([]);
    useEffect(()=>{
        getData();
    },[]);

    const getData=async()=>{
        try {
            const data = await axios.get('http://127.0.0.1:8000/api/getuser')
            setUsers(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    //  delete//
    // function deleteUsers(id) {
    //     fetch(`http://127.0.0.1:8000/api/deleteuser/${id}`, {
    //       method: "DELETE",
    //     })
    //       .then((result) => {
    //         result.json().then((resp) => {
    //           Swal.fire("Thành công", "xóa sản phẩm thành công", "success");
    //           console.warn(resp);
    //           getData();
    //         });
    //       })
    //       .catch((error) => {
    //         console.error("Error deleting user:", error);
    //       });
    //   }
      const getImageUrl = (fileName) => {
        const baseUrl = 'http://127.0.0.1:8000/storage/'; // Thay đổi đường dẫn cơ sở theo địa chỉ thư mục chứa ảnh của bạn
        return `${baseUrl}${fileName}`;
      };
      
      const columns = [
        {
            title: "Ứng viên",
            dataIndex: "username",
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
            title: "Ảnh ",
            dataIndex: "avatar",
            key: "avatar",
            render: (avatar) => <img src={getImageUrl(avatar)} alt="" style={{ width: '50px', height: '50px',borderRadius:"50px" }} />,
        }
    ]
    return (
        <div  className="table-container">
            
            <Table dataSource={users} columns={columns}></Table>
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
              {users.map((data) => (
                <tr key={data.id}>
                  <td>{data.username}</td>
                  <td>{data.email}</td>
                  <td>{data.password}</td>
                  <td>{data.address}</td>
                  <td>{data.number_phone}</td>
                  <td><img src={data.avatar}/></td>                                                                         
                  <td><button onClick={() => deleteUsers(data.id)} className="btn btn-primary">X</button> </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      );
}
export default Userad