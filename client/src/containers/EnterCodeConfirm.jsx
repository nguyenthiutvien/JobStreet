import React, { useEffect, useState } from 'react'
import "../_styles/forgotpassword.scss"
import { Link, useNavigate } from 'react-router-dom'
import {Button,Input,Form} from "antd"
import { recoverPassword,recoverPasswordEmployee } from '../api/Api'
export const UserEnterCode = () => {
    const navigate=useNavigate()
    const [code,setCode]=useState({
        code:""
    })
    const [time,setTime]=useState(60)
    const localCode=JSON.parse(localStorage.getItem("code")) 
    useEffect(()=>{
        if(time>0){
            const second=setInterval(()=>{
                setTime((coundown)=>coundown-1)
            },1000)
            return ()=>clearInterval(second)
        }else{
            localStorage.removeItem("code")
        }
    },[time])
    const compareCode=()=>{
        if(localCode===code.code){
            return Promise.resolve(true)
        }else{
            return Promise.reject("Mã xác thực sai")
        }
    }
   const resentEmail=(e)=>{
    e.preventDefault()
    ResentCodeUser()
    setTime(60)
   }
    const handelSubmit=()=>{
        navigate("/newpasswordUser")
    }
    return (
        <div className="container--form">
       
            <Form onFinish={handelSubmit}  action="" method="post">
                <div className="title--form">
                    <h3>Nhập mã xác thực</h3>
                </div>
                <div className="value--button">
                    <Form.Item
                        name="password"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập mã code"
                        },{
                            validator:compareCode
                        }]}
                        hasFeedback
                    >
                    <Input.Password name='password' className='data--button' placeholder='Nhập mã code' onChange={(e)=>setCode({code:e.target.value})}/>
                    </Form.Item> 
                        <p>Mã xác nhận sẽ hết hạn trong {time} s</p>
                    <Form.Item>
                    <Button className='data--button confirm' htmlType="submit">Xác thực</Button>
                    </Form.Item>
                </div>
            </Form>
            <div className="link--back">
                <h3>Tôi muốn<Link onClick={resentEmail} className="color" to={"#"}>gửi lại</Link></h3>
            </div> 

        </div>
    )
}

export const EmployeeEnterCode = () => {
    const navigate=useNavigate()
    const [code,setCode]=useState({
        code:""
    })
    const [time,setTime]=useState(60)
    const localCode=JSON.parse(localStorage.getItem("code")) 
    useEffect(()=>{
        if(time>0){
            const second=setInterval(()=>{
                setTime((coundown)=>coundown-1)
            },1000)
            return ()=>clearInterval(second)
        }else{
            localStorage.removeItem("code")
        }
    },[time])


    const compareCode=()=>{
        if(localCode===code.code){
            return Promise.resolve(true)
        }else{
            return Promise.reject("Mã xác thực sai")
        }
    }

    const resentCode=(e)=>{
        e.preventDefault()
        ResentCodeEmployee()
        setTime(60)
    }
    const handelSubmit=()=>{
        navigate("/newpasswordEmployee")
    }
    return (
        <div className="container--form">
       
            <Form onFinish={handelSubmit}  action="" method="post">
                <div className="title--form">
                    <h3>Nhập mã xác thực</h3>
                </div>
                <div className="value--button">
                    <Form.Item
                        name="password"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập mã code"
                        },{
                            validator:compareCode
                        }]}
                        hasFeedback
                    >
                    <Input.Password name='password' className='data--button' placeholder='Nhập mã code' onChange={(e)=>setCode({code:e.target.value})}/>
                    </Form.Item> 
                        <p>Mã xác nhận sẽ hết hạn trong {time} s</p>
                    <Form.Item>
                    <Button className='data--button confirm' htmlType="submit">Xác thực</Button>
                    </Form.Item>
                </div>
            </Form>
            <div className="link--back">
                <h3>Tôi muốn <Link onClick={resentCode} className="color" to={"#"}>gửi lại</Link></h3>
            </div> 

        </div>
    )
}

export const ResentCodeUser=async ()=>{
    const localCode=JSON.parse(localStorage.getItem('user'))
   const code=await recoverPassword(localCode)
   localStorage.setItem('code',JSON.stringify(code.data))
  }

  export const ResentCodeEmployee=async ()=>{
    const localCode=JSON.parse(localStorage.getItem('user'))
   const code=await recoverPasswordEmployee(localCode)
   localStorage.setItem('code',JSON.stringify(code.data))
  }