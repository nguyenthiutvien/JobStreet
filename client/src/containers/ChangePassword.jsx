import React, { useState } from 'react'
import "../_styles/changepassword.scss"
import { useNavigate, Link } from 'react-router-dom'
import { resetPassword, resetPasswordEmployee } from '../api/Api'
import { Form, Input, Button } from "antd"
export const UserChangePassword = () => {
    const [password,setPassword] =useState({
        password:""
    })
    
    const navigate = useNavigate()
    const email = JSON.parse(localStorage.getItem("user"));
    const handelSubmit = async () => {
        const Log = await resetPassword(email,password)
        console.log(Log.data)
        navigate("/")
    }
    return (
        <div className="container--form">
            <Form onFinish={handelSubmit} action="" method="post">
                <div className="title--form">
                    <h3>Lấy lại mật khẩu</h3>
                </div>
                <div className="value--button">
                    <Form.Item
                        name="password"
                        rules={[{
                            required: true,
                            message: "Bạn chưa nhập mật khẩu"
                        }, {
                            min: 8,
                            message: "Mật khẩu quá ngắn"
                        }]}
                        hasFeedback
                    >
                        <Input.Password name='password' className='data--button' placeholder='Nhâp mật khẩu mới'  onChange={(e)=>setPassword({password:e.target.value})}/>
                    </Form.Item>
                </div>
                <div className="value--button">
                    <Form.Item
                        name="confirm_pass"
                        dependencies={["password"]}
                        rules={[{
                            required: true,
                            message: "Bạn chưa nhập mật khẩu"
                        },
                        {
                            min: 8,
                            message: "Vui lòng nhập trên 8 ký tự"
                        }, ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject("Xác thực mật khẩu sai")
                            }
                        })
                        ]}
                        hasFeedback
                    >
                        <Input.Password name='confirm_pass' className='data--button' placeholder='Xác thực mật khẩu' />
                    </Form.Item>
                </div>
                <Form.Item>
                    <Button className='data--button confirm' htmlType="submit">Xác thực</Button>
                </Form.Item>
            </Form>
            <div className="link--back">
                <h3>Tôi muốn <Link className="color" to={"/"}>quay về</Link></h3>
            </div>

        </div>
    )
}

export const EmployeeChangePassword = () => {
    navigate=useNavigate()
    const [password,setPassword] =useState({
        password:""
    })
    
    const email = JSON.parse(localStorage.getItem("user"));

    const handelSubmit =async() => {
      const status= await  resetPasswordEmployee(email,password)
      console.log(status.data)
        navigate("/")
          
    }
    return (
        <div className="container--form">
            <Form onFinish={handelSubmit} action="" method="post">
                <div className="title--form">
                    <h3>Lấy lại mật khẩu</h3>
                </div>
                <div className="value--button">
                    <Form.Item
                        name="password"
                        rules={[{
                            required: true,
                            message: "Bạn chưa nhập mật khẩu"
                        }, {
                            min: 8,
                            message: "Mật khẩu quá ngắn"
                        }]}
                        hasFeedback
                    >
                        <Input.Password name='password' className='data--button' placeholder='Nhâp mật khẩu mới' onChange={(e)=>setPassword({password:e.target.value})}/>
                    </Form.Item>
                </div>
                <div className="value--button">
                    <Form.Item
                        name="confirm_pass"
                        dependencies={["password"]}
                        rules={[{
                            required: true,
                            message: "Bạn chưa nhập mật khẩu"
                        },
                        {
                            min: 8,
                            message: "Vui lòng nhập trên 8 ký tự"
                        }, ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject("Xác thực mật khẩu sai")
                            }
                        })
                        ]}
                        hasFeedback
                    >
                        <Input.Password name='confirm_pass' className='data--button' placeholder='Xác thực mật khẩu' />
                    </Form.Item>
                </div>
                <Form.Item>
                    <Button className='data--button confirm' htmlType="submit">Xác thực</Button>
                </Form.Item>
            </Form>
            <div className="link--back">
                <h3>Tôi muốn <Link className="color" to={"/"}>quay về</Link></h3>
            </div>
        </div>
    )
}