import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Table, Form, Input, Button, Modal, Select, message } from "antd";

import Swal from 'sweetalert2';
import axios from 'axios';


import { addJob, updateJob, deleteJob, getApplicationsCompany, getTokenCompany, getJobsCompany, updateCompanyInfo} from '../../api/Api';

const EmployerProfile = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState(<Apply/>, <Jobs/>);

    const handelInfor = () => {
        setContent(<CompanyInformation />);
    };

   

    const handelApply = () => {
        setContent(<Apply />);
    };

    const handelJob = () => {
        setContent(<Jobs />);
    };

    const changePassword=()=>{
      
    }
    const handelLogout = () => {
        Swal.fire({
            title: "Đăng xuất",
            text: "Bạn muốn đăng xuất",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đăng xuất",
            cancelButtonText: "Không"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("login");
                navigate("/");
            } else {
                navigate("/EmployerProfile");
            }
        });
    };

    return (
        <>
            <div className="container--user--profile">
                <div className="user--profile--left">
                    <TabBar
                        handelInfor={handelInfor}
                        handelApply={handelApply}
                        handelJob={handelJob}
                        changePassword={changePassword}
                        handelLogout={handelLogout}
                    />
                </div>
                <div className="user--profile--content">
                    {content}
                </div>
            </div>
        </>
    );
};

const TabBar = ({ handelInfor, changePassword, handelLogout, handelApply, handelJob }) => {
  const [company, setCompany] = useState({});
  const token = JSON.parse(localStorage.getItem("login"));

  useEffect(() => {
    const getInfor = async () => {
      const companyValue = await getTokenCompany(token.token);
      if (companyValue.data.status === 200) {
        setCompany(companyValue.data.company);
      }
    };
    getInfor();
  }, []);

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
              <Link className="color" to={"/"}>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link className="color" onClick={handelApply}>
                Hồ sơ ứng tuyển
              </Link>
            </li>
            <li>
              <Link className="color" onClick={handelJob}>
                Công việc
              </Link>
            </li>
            <li>
              <Link className="color" onClick={handelInfor}>
                Cập nhật thông tin
              </Link>
            </li>
            <li>
              <Link className="color" onClick={changePassword}>
                Đổi mật khẩu
              </Link>
            </li>
            <li>
              <Link className="color" onClick={handelLogout}>
                Đăng xuất
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};


const Apply = () => {
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
            key: "status"
        },
        
        {
            title: "Hồ sơ",
            dataIndex: "cv",
            key: "cv",
            render: (text, record) => (
                <>
                <a href={`http://127.0.0.1:8000/api/cv/${text}`} target="_blank" rel="noreferrer">Xem hồ sơ</a>
                <a  target="_blank" rel="noreferrer"></a>
                </>
            )
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
                rowClassName={record => (record.status === 'Pending' ? 'Approved' : '')}
                onRow={(record, rowIndex) => {
                    return {
                      onClick: () => {
                        // Hiển thị cửa sổ xác nhận khi người dùng nhấp vào hàng
                        Swal.fire({
                          title: 'Xác nhận',
                          text: 'Bạn có muốn thay đổi trạng thái?',
                          icon: 'question',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Đồng ý',
                          cancelButtonText: 'Hủy'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            // Người dùng đã xác nhận, gửi yêu cầu cập nhật trạng thái
                            handleStatusChange(record.id, 'Đã xem');
                          }
                        });
                      },
                    };
                  }}
                />
            </div>
        </div>
    );
};

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [form] = Form.useForm();
    const token = JSON.parse(localStorage.getItem('login'));
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await getJobsCompany(token.token);
        setJobs(response.data);
      };
      fetchData();
    }, [token.token]);
    console.log(jobs)
    const columns = [
      {
        title: 'Vị trí',
        dataIndex: 'position',
        key: 'position',
      },
      {
        title: 'Mô tả công việc',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Loại',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Lương',
        dataIndex: 'salary',
        key: 'salary',
      },
      {
        title: 'Ngày đóng',
        dataIndex: 'close_day',
        key: 'close_day',
      },
      {
        title: 'Category',
        dataIndex: 'cat_id',
        key: 'cat_id',
      },


      {
        title: 'Hành động',
        dataIndex: '',
        key: 'action',
        render: (text, record) => (
          <div>
            <Button type="primary" onClick={() => handleEdit(record)}>Sửa</Button>
            <Button type="primary" onClick={() => handleDelete(record)}>Xóa</Button>
          </div>
        ),
      },
    ];
  
    const handleAdd = async (values) => {
      // console.log(values)
      const Values={
        token:token.token,
        position:values.position,
        cat_id:values.cat_id,
        description:values.description,
        salary:values.salary,
        type:values.type,
        close_day:values.close_day
      }
        try {
          
          const response = await addJob(Values);
          if (response.data) {
            // Thêm công việc thành công
            setModalVisible(false);
            form.resetFields();
            // Cập nhật danh sách công việc
            const updatedJobs = [...jobs, response.data.job];
            setJobs(updatedJobs);
          }
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Hãy chờ admin duyệt!',
          });
        } catch (error) {
          // Xử lý lỗi khi thêm công việc
          console.error(error);
        // }
      };
    }
  
    const handleEdit = (job) => {
      setSelectedJob(job);
      setModalVisible(true);
    };
  
    const handleUpdate = async (values) => {
      try {
        const response = await updateJob(token.token, selectedJob.id, values);
        if (response.data.message === 'Công việc đã được cập nhật thành công') {
          // Cập nhật công việc thành công
          setModalVisible(false);
          form.resetFields();
          // Cập nhật danh sách công việc
          const updatedJobs = jobs.map((job) => {
            if (job.id === selectedJob.id) {
              return { ...job, ...response.data };
            }
            return job;
          });
          setJobs(updatedJobs);
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Công việc đã được cập nhật!',
          });
        }
      } catch (error) {
        // Xử lý lỗi khi cập nhật công việc
        console.error(error);
      }
    };
  
    const handleDelete = async (job) => {
      try {
        const response = await deleteJob(token.token, job.id);
        if (response.success) {
          // Xóa công việc thành công
          // Cập nhật danh sách công việc
          const updatedJobs = jobs.filter((item) => item.id !== job.id);
          setJobs(updatedJobs);
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Công việc đã được xóa!',
          });
        }
      } catch (error) {
        // Xử lý lỗi khi xóa công việc
        console.error(error);
      }
    };
  
    return (
      <div className="container--user--infor">
        <div className="user--title">
          <p>Công việc đã đăng</p>
        </div>
        <div className="user--content">
          <Button type="primary" onClick={() => setModalVisible(true)}>Thêm công việc</Button>
          <Table dataSource={jobs} columns={columns} />
  
          <Modal
            title={selectedJob ? 'Sửa công việc' : 'Thêm công việc'}
            visible={modalVisible}
            onCancel={() => {
              setModalVisible(false);
              form.resetFields();
            }}
            onOk={() => form.submit()}
          >
            <Form
              form={form}
              onFinish={selectedJob ? handleUpdate : handleAdd}
              initialValues={selectedJob ? selectedJob : null}
            >
              <Form.Item
                label="Vị trí"
                name="position"
                rules={[{ required: true, message: 'Vui lòng nhập vị trí' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mô tả công việc"
                name="description"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả công việc' }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                label="Loại"
                name="type"
                rules={[{ required: true, message: 'Vui lòng nhập loại công việc' }]}
              >
                <Select>
             <Select.Option value="Part-time">Part-time</Select.Option>
             <Select.Option value="Full-time">Full-time</Select.Option>
             </Select>
              </Form.Item>
               
              <Form.Item
                label="Category"
                name="cat_id"
                rules={[{ required: true, message: 'Vui lòng nhập loại công việc' }]}
              >
                <Select>
             <Select.Option value="1">Thực tập</Select.Option>
             <Select.Option value="2">Việc làm</Select.Option>
             </Select>
              </Form.Item>
              <Form.Item
                label="Lương"
                name="salary"
                rules={[{ required: true, message: 'Vui lòng nhập mức lương' }]}
              >
                <Input />
              </Form.Item>
              
              <Form.Item
                label="Ngày đóng"
                name="close_day"
                rules={[{ required: true, message: 'Vui lòng nhập ngày đóng' }]}
              >
                <Input type='date'></Input>
             
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    );
  };

  export const CompanyInformation = () => {
    const [update, setUpdate] = useState(false)
    const [upCompany, setUpCompany] = useState({
        company_name:"",
        logo:"",
        description:"",
        scale:"",
        address:"",
        number_phone: "",
        website:""

    })
    const token = JSON.parse(localStorage.getItem("login"));
    useEffect(() => {
        const getInfor = async () => {
            const companyValue = await getTokenCompany(token.token)
            setUpCompany(companyValue.data.company)
            console.log("aa",companyValue.data.company);
        }
        getInfor()
    }, [])

    const handelIpnut = (e) => {
        const companyValue = { ...upCompany, [e.target.name]: e.target.value }
        setUpCompany(companyValue)
    }
    const handelAvatar = (e) => {
        const companyImg = e.target.files[0]
        setUpCompany({ ...upCompany, logo: companyImg })
    }
    const handelUpdate = () => {
        setUpdate(true)
    }
    const handelSubmit = async () => {
        const id = upCompany.id;
        const formData = new FormData()
        formData.append("comapany_name", upCompany.company_name)
        formData.append("logo", upCompany.logo)
        formData.append("logo", upCompany.description)
        formData.append("address", upCompany.address)
        formData.append("scale", upCompany.scale)
        formData.append("number_phone", upCompany.number_phone)
        formData.append("website", upCompany.website)
        const update = await updateCompanyInfo(id, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        if(update){
            setUpdate(false)
        }

    }
    return (
        <>
        <div className="card-container">
            <div className="container--table-inform">
                <div className="cv--title">
                    <p>Thông tin công ty</p>
                </div>
                <div className="list--cv">
                    <Form onFinish={handelSubmit}>
                        <Form.Item
                            name="company_name"
                        >
                            <label>Tên của cong ty</label> <br />
                            {update === false ?
                                (<Input className='form--input' value={upCompany.company_name} placeholder='Tên của công ty' disabled />) :
                                (<input className='form--input' type='text' name='company_name' value={upCompany.company_name} placeholder='Tên của công ty' onChange={handelIpnut} />)}

                        </Form.Item>
                      
                        <Form.Item
                            name={"address"}
                        >
                            <label>Địa chỉ</label> <br />
                            {update === false ?
                                (<Input className='form--input' value={upCompany.address} placeholder='Địa chỉ của bạn' disabled></Input>) :
                                (<input className='form--input' type='text' name='address' value={upCompany.address} placeholder='Địa chỉ của bạn' onChange={handelIpnut} />)}

                        </Form.Item>
                        <Form.Item
                            name={"description"}
                        >
                            <label>Mô tả công ty</label> <br />
                            {update === false ?
                                (<Input className='form--input' value={upCompany.description} placeholder='Mô tả của công ty bạn' disabled></Input>) :
                                (<input className='form--input' type='text' name='description' value={upCompany.description} placeholder='Mô tả của công ty bạn' onChange={handelIpnut} />)}

                        </Form.Item>
                        <Form.Item
                            name={"number_phone"}
                        >
                            <label>Số điện thoại</label> <br />
                            {update === false ?
                                (<Input className='form--input' value={upCompany.number_phone} placeholder='Số điện thoại của bạn' disabled></Input>) :
                                (<input className='form--input' type='number' name='number_phone' value={upCompany.number_phone} placeholder='Số điện thoại của bạn' onChange={handelIpnut} />)}

                        </Form.Item>
                        <Form.Item>
                            <label>Ảnh đại diện</label> <br />
                            {update === false ?
                                (<img className='image--profile--user' src={`http://127.0.0.1:8000/storage/${upCompany.logo}`} alt="" />)
                                : (<Input className='form--input' name='logo' type='file' onChange={handelAvatar}></Input>)}
                        </Form.Item>
                         <Form.Item
                              name={"scale"}
                            >
                              <label>Quy mô</label> <br />
                              {update === false ? (
                                <Input
                                  className='form--input'
                                  value={upCompany.scale}
                                  placeholder='Quy mô'
                                  disabled
                                />
                              ) : (
                                <input
                                  className='form--input'
                                  type='text'
                                  name='scale'
                                  value={upCompany.scale}
                                  placeholder='Quy mô'
                                  onChange={handelIpnut}
                                />
                              )}
                            </Form.Item>
                            <Form.Item
                              name={"website"}
                            >
                              <label>Website</label> <br />
                              {update === false ? (
                                <Input
                                  className='form--input'
                                  value={upCompany.website}
                                  placeholder='Website'
                                  disabled
                                />
                              ) : (
                                <input
                                  className='form--input'
                                  type='text'
                                  name='website'
                                  value={upCompany.website}
                                  placeholder='Website'
                                  onChange={handelIpnut}
                                />
                              )}
                            </Form.Item>
                        
                        
                        <Form.Item>
                            {update === false ?
                                (<button type="primary" className='edit--button' onClick={handelUpdate} htmlType="button">
                                    Sửa
                                </button>) :
                                (<Button  className="update--button" htmlType="submit">
                                    Cập nhật
                                </Button>)}

                        </Form.Item>
                    </Form>
                </div>
            </div>
            </div>
        </>
    )
}



export default EmployerProfile;
