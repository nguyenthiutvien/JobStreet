import React, { useEffect, useState } from 'react';
import { Table, Button,Select } from 'antd';
import Swal from 'sweetalert2';
import { getApplicationsCompany, deleteJob } from '../../api/Api';


const Application = () => {
  const token = JSON.parse(localStorage.getItem("login"));
  // console.log(token.token)
  const [apply, setApply] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await getApplicationsCompany(token.token);
              // console.log(response.data)
              setApply(response.data)
              setLoading(false);
              // console.log("gyty",response.data);
          
          } catch (error) {
              console.log(error);
              setLoading(false);
          }
      };

      fetchData();
  }, [token.token]);
  
  
  const handleAccept = (status, user_id, job_id) => {
    const data = {
      status: status,
    };
  
    fetch(`http://127.0.0.1:8000/api/accept-applications/${user_id}/${job_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire("Thành công", "Thành công", "success");
        getData();
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };
  
  const handleReject = (user_id,job_id) => {
    fetch(`http://127.0.0.1:8000/api/reject-applications/${user_id}/${job_id}`, {
      method: "DELETE",
    })
      .then((result) => {
        result.json().then((data) => {
          Swal.fire("Thành công", "Từ chối thành công", "success");
          console.warn(data);
          getData();
        });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };


  // console.log(apply)
  const columns = [
      {
          title: "Tên ứng cử viên",
          dataIndex: "username",
          key: "name"
      },
      {
          title: "Email",
          dataIndex: "email",
          key: "email"
      },
      {
          title: "Vị trí ứng tuyển",
          dataIndex: "position",
          key: "position"
      },
      {
          title: "Ngày ứng tuyển",
          dataIndex: "created_at",
          key: "date"
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (text, record) => (
          <Select
            value={text}
            onChange={(value) => handleAccept(value, record.user_id, record.job_id)}
          >
            <Option value="pending">Chờ xử lý</Option>
            <Option value="reviewing">Đang review CV</Option>
            <Option value="accepted">Đồng ý phỏng vấn</Option>
            <Option value="rejected">Đã từ chối</Option>
          </Select>
        ),
      },
      
      {
          title: "Hồ sơ",
          dataIndex: "cv",
          key: "cv",
          render: (text, record) => (
            <>

            <span>
            <a href={`http://127.0.0.1:8000/api/cv/${text}`} target="_blank" rel="noreferrer">Xem hồ sơ</a>
              <a  target="_blank" rel="noreferrer"></a>
              
            </span>
            </>
          ),


      }
  ];

  

  return (
      <div className="container--table--cv">
          <div className="cv--title">
              <p>Danh sách ứng cử viên</p>
          </div>
          <div className="list--cv">
              <Table 
              dataSource={apply} 
              columns={columns} 
              loading={loading}
              
            //   rowClassName={record => (record.status === 'Pending' ? 'Approved' : '')}
              
            //   onRow={(record, rowIndex) => {
            //       return {
            //         onClick: () => {
            //           // Hiển thị cửa sổ xác nhận khi người dùng nhấp vào hàng
            //           Swal.fire({
            //             title: 'Xác nhận',
            //             text: 'Bạn có muốn thay đổi trạng thái?',
            //             icon: 'question',
            //             showCancelButton: true,
            //             confirmButtonColor: '#3085d6',
            //             cancelButtonColor: '#d33',
            //             confirmButtonText: 'Đồng ý',
            //             cancelButtonText: 'Hủy'
            //           }).then((result) => {
            //             if (result.isConfirmed) {
            //               // Người dùng đã xác nhận, gửi yêu cầu cập nhật trạng thái
            //               handleStatusChange(record.id, 'Đồng ý');
            //             }
            //           });
            //           console.log("hgwhdg",record.status)
            //         },
            //       };
            //     }}
              />
          </div>
      </div>
  );
};

export default Application;
