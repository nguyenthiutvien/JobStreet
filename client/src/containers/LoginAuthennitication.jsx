import "../_styles/login.scss";
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { userLogin, getUser,getCompany,employeeLogin } from "../api/Api";
import { Form, Input, Button } from "antd"
import axios from "axios";
export const LoginUser = () => {
    const navigate = useNavigate()
    const [userlogin, setUserLogin] = useState([])
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const handelInput = (e) => {
        const values = { ...login, [e.target.name]: e.target.value }
        setLogin(values)
    }
    useEffect(() => {
        const compareUser = async () => {
            const user = await getUser()
            setUserLogin(user.data)
        }
        compareUser()
    }, [])

    const acountAlreadyEmail = (rule, value) => {
        const user = userlogin.some(user => user.email === login.email && user.password !== login.password);
        if (user) {
            return Promise.reject("Mật khẩu hoặc tài khoản sai");
        }
        return Promise.resolve()
    }

    const acountUnAlready = (rule, value) => {
        const user = userlogin.some(user => user.email === login.email );
        if (!user) {
            return Promise.reject("Tài khoản không tồn tại");
        }
        return Promise.resolve()
    }


    const handelSubmit = async (e) => {
          const status= await userLogin(e)
          if (status.data==200) {
            navigate("/homePage")
          }
        
    }
    return (
        <div className='container--login'>
            <Form onFinish={handelSubmit} action="" method="post" className='margin--top'>
                <div className="content--login">
                    <h2>Đăng nhập</h2>
                </div>
                <div className="form--login">
                    <Form.Item
                        name={"email"}
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập email"
                        },
                        {
                            type: "email",
                            message: "Email không hợp lệ",
                        },{
                            validator:acountUnAlready
                        }
                        ]}
                    >
                        <Input name="email" className='login--email' placeholder="Nhập Email để đăng nhâp" onChange={handelInput} />
                    </Form.Item>
                    <Form.Item
                        name={"password"}
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập mật khẩu"
                        }, {
                            min: 8,
                            message: "Mật khẩu phải có 8 ký tự"
                        },
                        {
                            validator: acountAlreadyEmail
                        }
                        ]}
                    >
                        <Input.Password name="password" className='login--password' placeholder="Nhâp mật khẩu" onChange={handelInput} />
                    </Form.Item>
                </div>
                <div className="forgot--pass">
                    <Link to={"/userForgot"}><h4> Bạn quên mật khẩu ?</h4></Link>
                </div>
                <Form.Item>
                    <Button htmlType="submit" className='button--login'><h3>Đăng nhập</h3></Button>
                </Form.Item>

            </Form>

            <div className="another--relevent">
                <p>Bạn chưa có tài khoản ? <Link to={"/registerUser"}>Nhấn vào đây</Link> để dễ dàng tạo tài khoản</p>
                <p>Nếu bạn là nhà tuyển dụng, hãy <Link to={"/loginEmployee"}> Nhấn vào đây</Link></p>

            </div>
        </div>
    )
}


export const LoginEmployee = () => {
    const navigate = useNavigate()
    const [employeelogin, setEmployeeLogin] = useState([])
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const handelInput = (e) => {
        const values = { ...login, [e.target.name]: e.target.value }
        setLogin(values)
    }
    useEffect(() => {
        const compareEmployee = async () => {
            const employee = await getCompany()
            setEmployeeLogin(employee.data)
        }
        compareEmployee()
    }, [])

    const acountAlreadyEmail = (rule, value) => {
        const user = employeelogin.some(user => user.email === login.email && user.password !== login.password);
        if (user) {
            return Promise.reject("Mật khẩu hoặc tài khoản sai");
        }
        return Promise.resolve()
    }

    const acountUnAlready = (rule, value) => {
        const employee = employeelogin.some(user => user.email === login.email );
        if (!employee) {
            return Promise.reject("Tài khoản không tồn tại");
        }
        return Promise.resolve()
    }


    const handelSubmit = async (e) => {
        const status= await employeeLogin(e)
        if (status.data==200) {
            navigate("/homePage")
        }
        
    }
         
    
    return (
        <div className='container--login'>
            <Form onFinish={handelSubmit} action="" method="post" className='margin--top'>
                <div className="content--login">
                    <h2>Đăng nhập</h2>
                </div>
                <div className="form--login">
                    <Form.Item
                        name={"email"}
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập email"
                        },
                        {
                            type: "email",
                            message: "Email không hợp lệ",
                        },{
                            validator:acountUnAlready
                        }
                        ]}
                    >
                        <Input name="email" className='login--email' placeholder="Nhập Email để đăng nhâp" onChange={handelInput} />
                    </Form.Item>
                    <Form.Item
                        name={"password"}
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập mật khẩu"
                        }, {
                            min: 8,
                            message: "Mật khẩu phải có 8 ký tự"
                        },
                        {
                            validator: acountAlreadyEmail
                        }
                        ]}
                    >
                        <Input.Password name="password" className='login--password' placeholder="Nhâp mật khẩu" onChange={handelInput} />
                    </Form.Item>
                </div>
                <div className="forgot--pass">
                    <Link to={"/employeeForgot"}><h4> Bạn quên mật khẩu ?</h4></Link>
                </div>
                <Form.Item>
                    <Button htmlType="submit" className='button--login'><h3>Đăng nhập</h3></Button>
                </Form.Item>

            </Form>

            <div className="another--relevent">
                <p>Bạn chưa có tài khoản ? <Link to={"/registerEmployee"}>Nhấn vào đây</Link> để dễ dàng tạo tài khoản</p>
            </div>
        </div>
    )
}