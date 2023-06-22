import { useEffect, useState } from "react"
// import "../_styles/forgotpassword.scss"
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
            <p className="confirm--error">{error && error.email}</p>
           
          </div>
          <button className='data--button confirm' type="submit">Xác thực</button>
        </form>
        <div className="link--back">
          <p>Tôi muốn <Link className="color" to={"/"}>quay về</Link></p>
        </div>

      </div>
    )
}
export const EmployeeFogotPassword = () => {
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
      const status = await confirmEmailEmployee(email.email)
      switch (status.data.status) {
        case 422:
          error.email = status.data.message
          break;
        case 400:
          error.email = status.data.message
          break;
        case 200:
          const code = await recoverPasswordEmployee(email.email)
          localStorage.setItem("code",JSON.stringify(code.data))
          localStorage.setItem("user",JSON.stringify(email.email))
          navigate("/entercodeEmployee")
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
            <h3>Xác thực email</h3>
          </div>
          <div className="value--button">

            <input name="email"
              type="email"
              className='data--button'
              placeholder="Nhập email của bạn"
              onChange={(e) => setEmail({ email: e.target.value })}></input><br />
            <p className="confirm--error">{error && error.email}</p>
           
          </div>
          <button className='data--button confirm' type="submit">Xác thực</button>
        </form>
        <div className="link--back">
          <p>Tôi muốn <Link className="color" to={"/"}>quay về</Link></p>
        </div>

      </div>
    )
}


