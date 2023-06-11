import { useNavigate } from "react-router-dom"
import "../_styles/register.scss"
import React, { useState } from "react"
import { postUser, getUser,getCompany,postCompany } from "../api/Api"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Input, Button } from "antd"

export const Register = () => {
    const navigate = useNavigate()
   
    const [userLogin, setUserLogin] = useState([])
    useEffect(() => {
        const getAllUser = async () => {
            const values = await getUser()
            setUserLogin(values.data)
            console.log(values.data)
        }
        getAllUser()
    }, [])

    const checkEmailExists = (rule, value) => {
        const emailExists = userLogin.some((user) => user.email === value);
    
        if (emailExists) {
            return Promise.reject("Tài khoản đã tồn tại");
          }
          return Promise.resolve();
      };
    const handelSubmit =async (e) => {
        postUser(e);
        navigate("/hi")
       
    }
    return (
        <div className="container--body">
            <div className='container--register'>
                <div className="register--title">
                    <h3>Tạo tài khoản của bạn</h3>
                </div>
                <div className="register--button">
                    <button type="submit">ĐĂNG KÝ BẰNG FACEBOOK</button> <br /><br />
                    <button type="submit">ĐĂNG KÝ BẰNG LINKEDIN</button>
                </div>
                <div className="or--option">
                    --- Hoặc ---
                </div>
                <Form onFinish={handelSubmit} action="" method="post">
                    <div className="form--register">
                        <div className="left--for">
                            <Form.Item
                                name="username"
                                rules={[{
                                    required: true,
                                    message: 'Vui lòng nhập tên'
                                },
                                {
                                    min: 8,
                                    message: 'Tên phải trên 8 ký tự'
                                }]}
                                hasFeedback
                                >

                                <Input className='form--name' placeholder='Nhập họ tên của bạn'  />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                hasFeedback
                                rules={[{
                                    required: true,
                                    message: 'Vui lòng nhập email'
                                },
                                {
                                    type: "email",
                                    message: 'Email không hợp lệ'
                                },{
                                    validator:checkEmailExists
                                }
                                ]}
                                
                               
                            >

                                <Input className='form--name' placeholder='Nhập Email của bạn'  />
                             
                            </Form.Item>

                            <Form.Item
                                name="number_phone"
                                
                                rules={[{
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại'
                                },
                                {
                                    pattern: /^\d+$/,
                                    message: 'Vui lòng chỉ nhập số',
                                },
                                {
                                    len: 10,
                                    message: 'Số điện thoại phải có đúng 10 chữ số',
                                },]}
                                hasFeedback
                                >
                                <Input className='form--name' placeholder='Nhập số điện thoại của bạn'  />
                            </Form.Item>
                        </div>
                        <div className="right--form">
                            <Form.Item
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập địa chỉ"
                                    }
                                ]}
                                hasFeedback
                                >
                                <Input className='form--name' placeholder='Địa chỉ của bạn'  />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {  
                                        required: true,
                                        message: "Vui lòng nhập mật khẩu ",

                                    },
                                    {
                                        min: 8,
                                        message: "Vui lòng nhập lớn hơn 8 ký tự",

                                    }]}
                                    hasFeedback
                                    >
                                <Input.Password className='form--name' placeholder='Nhập mật khẩu của bạn'  />
                            </Form.Item>
                            <Form.Item
                                name="confirmPass"
                                // type={showPass ? "text" : "password"}
                                dependencies={["password"]}
                                hasFeedback
                                rules={[
                                    {

                                        required: true,
                                        message: "Vui lòng nhập mật khẩu",
                                    },
                                    {
                                        min: 8,
                                        message: "Vui lòng nhập trên 8 ký tự"
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject("Xác thực không đúng");
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password className="form--name" placeholder="Xác thực mật khẩu" />
                            </Form.Item>

                        </div>
                    </div>
                    <Form.Item>
                        <Button htmlType="submit" className="register"><b>Đăng ký</b> </Button>
                    </Form.Item>
                </Form>
                <div className="login">
                    <h4>Bạn đã có tài khoản <Link className="link--to" to={"/"}>Đăng nhập</Link></h4>
                </div>
            </div>
        </div>
    )
}


export const RegisterEmployee = () => {
    const navigate = useNavigate()
   
    const [userLogin, setUserLogin] = useState([])
    useEffect(() => {
        const getAllUser = async () => {
            const values = await getCompany()
            setUserLogin(values.data)
            console.log(values.data)
        }
        getAllUser()
    }, [])
    const checkEmailExists = (rule, value) => {
        const emailExists = userLogin.some((user) => user.email === value);
    
        if (emailExists) {
            return Promise.reject("Tài khoản đã tồn tại");
          }
          return Promise.resolve();
      };
    
      const checkCompanyExists =(rule,value)=>{
        const companyExists=userLogin.some((item)=> item.company_name === value);
        if(companyExists){
            return Promise.reject("Tên công ty đã tồn tại")
        }
        return Promise.resolve();
      }
    const handelSubmit =async (e) => {
        postCompany(e);
        navigate("/")
        // console.log(e)
       
    }
    return (
        <div className="container--body">
            <div className='container--register'>
                <div className="register--title">
                    <h3>Tạo tài khoản của bạn</h3>
                </div>
                <div className="register--button">
                    <button type="submit">ĐĂNG KÝ BẰNG FACEBOOK</button> <br /><br />
                    <button type="submit">ĐĂNG KÝ BẰNG LINKEDIN</button>
                </div>
                <div className="or--option">
                    --- Hoặc ---
                </div>
                <Form onFinish={handelSubmit} action="" method="post">
                    <div className="form--register">
                        <div className="left--for">
                            <Form.Item
                                name="company_name"
                                rules={[{
                                    required: true,
                                    message: 'Vui lòng nhập tên'
                                },
                                {
                                    validator:checkCompanyExists
                                }
                                ]}
                                hasFeedback
                                >

                                <Input className='form--name' placeholder='Nhập họ tên của bạn'  />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                hasFeedback
                                rules={[{
                                    required: true,
                                    message: 'Vui lòng nhập email'
                                },
                                {
                                    type: "email",
                                    message: 'Email không hợp lệ'
                                },{
                                    validator:checkEmailExists
                                }
                                ]}
                                
                               
                            >

                                <Input className='form--name' placeholder='Nhập Email của bạn'  />
                             
                            </Form.Item>

                            <Form.Item
                                name="number_phone"
                                
                                rules={[{
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại'
                                },
                                {
                                    pattern: /^\d+$/,
                                    message: 'Vui lòng chỉ nhập số',
                                },
                                {
                                    len: 10,
                                    message: 'Số điện thoại phải có đúng 10 chữ số',
                                },]}
                                hasFeedback
                                >
                                <Input className='form--name' placeholder='Nhập số điện thoại của bạn'  />
                            </Form.Item>
                        </div>
                        <div className="right--form">
                            <Form.Item
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập địa chỉ"
                                    }
                                ]}
                                hasFeedback
                                >
                                <Input className='form--name' placeholder='Địa chỉ của bạn'  />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {  
                                        required: true,
                                        message: "Vui lòng nhập mật khẩu ",

                                    },
                                    {
                                        min: 8,
                                        message: "Vui lòng nhập lớn hơn 8 ký tự",

                                    }]}
                                    hasFeedback
                                    >
                                <Input.Password className='form--name' placeholder='Nhập mật khẩu của bạn'  />
                            </Form.Item>
                            <Form.Item
                                name="confirmPass"
                                dependencies={["password"]}
                                hasFeedback
                                rules={[
                                    {

                                        required: true,
                                        message: "Vui lòng nhập mật khẩu",
                                    },
                                    {
                                        min: 8,
                                        message: "Vui lòng nhập trên 8 ký tự"
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject("Xác thực không đúng");
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password className="form--name" placeholder="Xác thực mật khẩu" />
                            </Form.Item>

                        </div>
                    </div>
                    <Form.Item>
                        <Button htmlType="submit" className="register"><b>Đăng ký</b> </Button>
                    </Form.Item>
                </Form>
                <div className="login">
                    <h4>Bạn đã có tài khoản <Link className="link--to" to={"/"}>Đăng nhập</Link></h4>
                </div>
            </div>
        </div>
    )
}
