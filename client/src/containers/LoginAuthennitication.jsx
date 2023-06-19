import "../_styles/login.scss";
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { userLogin, getCompany, employeeLogin } from "../api/Api";
import { Form, Input, Button } from "antd"
import axios from "axios";
export const LoginUser = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const handelInput = (e) => {
        const values = { ...login, [e.target.name]: e.target.value }
        setLogin(values)
    }
    const [error, setError] = useState({})

    const handelSubmit = async (e) => {
        e.preventDefault();
        let error = {}
        const token = await userLogin(login)
        switch (token.data.status) {
            case "empty_email":
                error.email = token.data.message
                break
            case "empty_password":
                error.password = token.data.message
               break
            case 404:
                error.email = token.data.message
                break;
            case 200:
                localStorage.setItem("login", JSON.stringify({ token: token.data.token, email: token.data.email }))

                navigate("/")
            default:
                break;
        }
        setError(error)



    }
    return (
        <div className='container--login'>
            <form onSubmit={handelSubmit} action="" method="post" className='margin--top'>
                <div className="content--login">
                    <h2>Đăng nhập</h2>
                </div>
                <div className="form--login">
                    <input name="email" type="email" className='login--email' placeholder="Nhập Email để đăng nhâp" onChange={handelInput} /> <br />
                    <p>{error.email}</p>
                    <input name="password" type="password" className='login--password' placeholder="Nhâp mật khẩu" onChange={handelInput} /> <br />
                    <p>{error.password}</p>
                </div>
                <div className="forgot--pass">
                    <Link to={"/userForgot"}><h4> Bạn quên mật khẩu ?</h4></Link>
                </div>

                <button type="submit" className='button--login'><h3>Đăng nhập</h3></button>


            </form>

            <div className="another--relevent">
                <p>Bạn chưa có tài khoản ? <Link to={"/registerUser"}>Nhấn vào đây</Link> để dễ dàng tạo tài khoản</p>
                <p>Nếu bạn là nhà tuyển dụng, hãy <Link to={"/loginEmployee"}> Nhấn vào đây</Link></p>

            </div>
        </div>
    )
}

export const LoginEmployee = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const handelInput = (e) => {
        const values = { ...login, [e.target.name]: e.target.value }
        setLogin(values)
    }
    const [error, setError] = useState({})

    const handelSubmit = async (e) => {
        e.preventDefault();
        let error = {}
        const token = await employeeLogin(login)
        switch (token.data.status) {
            case "empty_email":
                error.email = token.data.message
                break
            case "empty_password":
                error.password = token.data.message
               break
            case 404:
                error.email = token.data.message
                break;
            case 200:
                localStorage.setItem("login", JSON.stringify(token.data.token))
                navigate("/")
            default:
                break;
        }
        setError(error)
    }
 
    return (
        <div className='container--login'>
            <form onSubmit={handelSubmit} action="" method="post" className='margin--top'>
                <div className="content--login">
                    <h2>Đăng nhập</h2>
                </div>
                <div className="form--login">
                    <input name="email" type="email" className='login--email' placeholder="Nhập Email để đăng nhâp" onChange={handelInput} /> <br />
                    <p>{error.email}</p>
                    <input name="password" type="password" className='login--password' placeholder="Nhâp mật khẩu" onChange={handelInput} /> <br />
                    <p>{error.password}</p>
                </div>
                <div className="forgot--pass">
                    <Link to={"/userForgot"}><h4> Bạn quên mật khẩu ?</h4></Link>
                </div>

                <button type="submit" className='button--login'><h3>Đăng nhập</h3></button>


            </form>

            <div className="another--relevent">
                <p>Bạn chưa có tài khoản ? <Link to={"/registerUser"}>Nhấn vào đây</Link> để dễ dàng tạo tài khoản</p>
                <p>Nếu bạn là nhà tuyển dụng, hãy <Link to={"/loginEmployee"}> Nhấn vào đây</Link></p>

            </div>
        </div>
    )
}
// export const LoginEmployee = () => {
//     const navigate = useNavigate()
//     const [employeelogin, setEmployeeLogin] = useState([])
//     const [login, setLogin] = useState({
//         email: "",
//         password: ""
//     })
//     const handelInput = (e) => {
//         const values = { ...login, [e.target.name]: e.target.value }
//         setLogin(values)
//     }
//     useEffect(() => {
//         const compareEmployee = async () => {
//             const employee = await getCompany()
//             setEmployeeLogin(employee.data)
//         }
//         compareEmployee()
//     }, [])

//     const acountAlreadyEmail = (rule, value) => {
//         const user = employeelogin.some(user => user.email === login.email && user.password !== login.password);
//         if (user) {
//             return Promise.reject("Mật khẩu hoặc tài khoản sai");
//         }
//         return Promise.resolve()
//     }

//     const acountUnAlready = (rule, value) => {
//         const employee = employeelogin.some(user => user.email === login.email);
//         if (!employee) {
//             return Promise.reject("Tài khoản không tồn tại");
//         }
//         return Promise.resolve()
//     }


//     const handelSubmit = async (e) => {
//         const status = await employeeLogin(e)
//         if (status.data == 200) {
//             navigate("/")
//         }

//     }


//     return (
//         <div className='container--login'>
//             <Form onFinish={handelSubmit} action="" method="post" className='margin--top'>
//                 <div className="content--login">
//                     <h2>Đăng nhập</h2>
//                 </div>
//                 <div className="form--login">
//                     <Form.Item
//                         name={"email"}
//                         rules={[{
//                             required: true,
//                             message: "Vui lòng nhập email"
//                         },
//                         {
//                             type: "email",
//                             message: "Email không hợp lệ",
//                         }, {
//                             validator: acountUnAlready
//                         }
//                         ]}
//                         hasFeedback
//                     >
//                         <Input name="email" className='login--email' placeholder="Nhập Email để đăng nhâp" onChange={handelInput} />
//                     </Form.Item>
//                     <Form.Item
//                         name={"password"}
//                         rules={[{
//                             required: true,
//                             message: "Vui lòng nhập mật khẩu"
//                         }, {
//                             min: 8,
//                             message: "Mật khẩu phải có 8 ký tự"
//                         },
//                         {
//                             validator: acountAlreadyEmail
//                         }
//                         ]}
//                         hasFeedback
//                     >
//                         <Input.Password name="password" className='login--password' placeholder="Nhâp mật khẩu" onChange={handelInput} />
//                     </Form.Item>
//                 </div>
//                 <div className="forgot--pass">
//                     <Link to={"/employeeForgot"}><h4> Bạn quên mật khẩu ?</h4></Link>
//                 </div>
//                 <Form.Item>
//                     <Button htmlType="submit" className='button--login'><h3>Đăng nhập</h3></Button>
//                 </Form.Item>

//             </Form>

//             <div className="another--relevent">
//                 <p>Bạn chưa có tài khoản ? <Link to={"/registerEmployee"}>Nhấn vào đây</Link> để dễ dàng tạo tài khoản</p>
//             </div>
//         </div>
//     )
// }