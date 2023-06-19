import { useEffect, useState } from "react"
import "../_styles/forgotpassword.scss"
import { Link, useNavigate } from "react-router-dom"
import { recoverPassword, confirmEmail, confirmEmailEmployee, recoverPasswordEmployee } from "../api/Api"
import { Form, Input, Button } from "antd"

export const UserFogotPassword = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState({
    email: ""
  })
  const [error, setError] = useState({})
  const handelSubmit = async (e) => {
    let error = {}
    e.preventDefault()
    if (email.email == "") {
      error.email = "Vui lòng nhập email"
    } else {
      const status = await confirmEmail(email.email)
      switch (status.data.status) {
        case 422:
          error.email = status.data.message
          break;
        case 400:
          error.email = status.data.message
          break;
        case 200:
          const code = await recoverPassword(email.email)
          localStorage.setItem("code",JSON.stringify(code.data))
          localStorage.setItem("user",JSON.stringify(email.email))
          navigate("/entercodeUser")
        default:
          break;
      }
    }
    setError(error)
  }
    return (
      <div className="container--form">
        <form onSubmit={handelSubmit} action="" method="post">
          <div className="title--form">
            <h3>Xác thực Email</h3>
          </div>
          <div className="value--button">

            <input name="email"
              type="email"
              className='data--button'
              placeholder="Nhập email của bạn"
              onChange={(e) => setEmail({ email: e.target.value })}></input><br />
            <p>{error && error.email}</p>
           
          </div>
          <button className='data--button confirm' type="submit">Xác thực</button>
        </form>
        <div className="link--back">
          <h3>Tôi muốn <Link className="color" to={"/"}>quay về</Link></h3>
        </div>

      </div>
    )
  }


export const EmployeeFogotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState({
    email: ""
  })
  const [checkEmployees, setCheckEmployee] = useState([])

  useEffect(() => {
    const checkEmployee = async () => {
      if (email.email) {
        const values = await confirmEmailEmployee(email.email)
        if (values) {
          setCheckEmployee(values.data)
        }
      }
    }
    checkEmployee()
  }, [email.email])
  const handelSubmit = async () => {
    if (checkEmployees.email === email.email) {
      const code = await recoverPasswordEmployee(email.email)
      localStorage.setItem("code", JSON.stringify(code.data))
      localStorage.setItem("user", JSON.stringify(checkEmployees.email))
      navigate("/entercodeEmployee")
    } else {
      console.log("Tài khoản không đã tồn tai");
    }

  }
  return (
    <div className="container--form">
      <Form onFinish={handelSubmit} action="" method="post">
        <div className="title--form">
          <h3>Xác thực Email</h3>
        </div>
        <div className="value--button">
          <Form.Item
            name="email"
            rules={[{
              required: true,
              message: "Email không được để trống"
            },
            {
              type: "email",
              message: "Email không hợp lệ"
            }

            ]}
            hasFeedback
          >
            <Input name="email"
              className='data--button'
              placeholder="Nhập email của bạn"
              onChange={(e) => setEmail({ email: e.target.value })}></Input>
          </Form.Item>
          <Form.Item>
            <Button className='data--button confirm' htmlType="submit">Xác thực</Button>
          </Form.Item>

        </div>
      </Form>
      <div className="link--back">
        <h3>Tôi muốn <Link className="color" to={"/"}>quay về</Link></h3>
      </div>

    </div>
  )
}


