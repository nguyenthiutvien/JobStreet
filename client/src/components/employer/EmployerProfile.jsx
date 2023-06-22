import React, { useEffect, useState } from 'react'
import "../../_style/user/tabbar.scss";
import { Link, useNavigate } from "react-router-dom"
import { Table, Form, Input, Button } from "antd"
import { getApplications, getTokenUser, updateUser,UserChangePassword } from '../../api/Api';
import Swal from 'sweetalert2';
import axios from 'axios';
export const EmployerProfile = () => {
    const navigate=useNavigate()
    const [content, setContent] = useState(<Apply></Apply>)
    const handelInfor = () => {
        setContent(<CompanyInformation></CompanyInformation>)
    }
    const changePassword = () => {
        setContent(<ChangePassword></ChangePassword>)
    }
    const handelApply = () => {
        setContent(<Apply></Apply>)
    }
    const handelLogout = () => {
        Swal.fire({
            title:"Đăng xuất",
            text:"Bạn muốn đăng xuất",
            icon:"info",
            showCancelButton:true,
            confirmButtonColor:"#3085d6",
            cancelButtonColor:"#d33",
            confirmButtonText:"Đăng xuất",
            cancelButtonText:"Không"
        }).then((result)=>{
            if(result.isConfirmed){
                localStorage.removeItem("login")
                navigate("/")
            }else{
                navigate("/EmployerProfile")
            }
        })
    }
    return (
        <>
            <div className="container--user--profile">
                <div className="user--profile--left">
                    <TabBar handelInfor={handelInfor} handelApply={handelApply} changePassword={changePassword} handelLogout={handelLogout}></TabBar>
                </div>
                <div className="user--profile--content">
                    {content}
                </div>
            </div>
        </>
    )
}
export const TabBar = ({ handelInfor, changePassword ,handelLogout,handelApply}) => {
    const [user, setUser] = useState([]);
    const token = JSON.parse(localStorage.getItem("login"));
    useEffect(() => {
        const getInfor = async () => {
            const companyValue = await getTokenUser(token.token)
            setUser(companyValue.data.user)
        }
        getInfor()
    }, [])
    return (
        <div>
            <div className="container--tabbar">
                <div className="tabbar--image">
                    <div className="image--profile">
                        
                        <img src={`http://127.0.0.1:8000/storage/${company.logo}`} alt="" />
                    </div>
                    <div className="user--name">
                        <p>{company.compnay_name}</p>
                    </div>
                </div>
                <div className="tabbar--drop--down">
                    <ul>
                        <li><Link className='color' to={"/"}>Trang chủ</Link></li>
                        <li><Link className='color' onClick={handelApply} >Ứng tuyển viên</Link></li>
                        <li><Link className='color' onClick={handelInfor}>Thông tin</Link></li>
                        <li><Link className='color' onClick={changePassword}>Đổi mật khẩu</Link></li>
                        <li><Link className='color' onClick={handelLogout}>Đăng xuất</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export const Apply = () => {
    const email = JSON.parse(localStorage.getItem("login"));
    const [apply, setAppy] = useState([])
    useEffect(() => {
        const getApply = async () => {
            const values = await getApplications(email.email);
            setAppy(values.data)
        }
        getApply();
    }, [])
    const columns = [
        {
            title: "Tên ứng cử viên",
            dataIndex: "company_name",
            key: "name"
        }, {
            title: "Vị trí ứng tuyển",
            dataIndex: "position",
            key: "position"
        },
        {
            title: "Ngày ứng tuyển",
            dataIndex: "created_at",
            key: "date"
        },
        {
            title: "Tình trạng",
            dataIndex: "status",
            key: "status"
        }
        {
            title: "Hồ sơ",
            dataIndex:"cv",
            key:"cv"
        }
    ]
    return (
        <>
            <div className="container--table--cv">
                <div className="cv--title">
                    <p>Danh ứng cử viên</p>
                </div>
                <div className="list--cv">
                    <Table dataSource={apply} columns={columns}>
                    </Table>
                </div>
            </div>
        </>
    )
}
export const CompanyInformation = () => {
    const [update, setUpdate] = useState(false)
    const [upUser, setUpUser] = useState({
        company_name: "",
        logo:"",
        scale:0,
        description:"",
        website: "",
        address: "",
        number_phone: "",
     
        
    })
    const token = JSON.parse(localStorage.getItem("login"));
    useEffect(() => {
        const getInfor = async () => {
            const companyValue = await getTokenUser(token.token)
            setUpUser(companyValue.data.user)
        }
        getInfor()
    }, [])

    const handelIpnut = (e) => {
        const companyValue = { ...upUser, [e.target.name]: e.target.value }
        setUpUser(companyValue)
    }
    const handelAvatar = (e) => {
        const userImg = e.target.files[0]
        setUpUser({ ...upUser, avatar: userImg })
    }
    const handelUpdate = () => {
        setUpdate(true)
    }
    const handelSubmit = async () => {
        const id = upUser.id;
        const formData = new FormData()
        formData.append("company_name", upUser.company_name)
        formData.append("logo", upUser.logo)
        formData.append("scale", upUser.scale)
        formData.append("website", upUser.website)
        formData.append("number_phone", upUser.number_phone)
        formData.append("address", upUser.address)
        const update = await updateUser(id, formData, {
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
            <div className="container--table-inform">
                <div className="cv--title">
                    <p>Thông tin công ty</p>
                </div>
                <div className="list--cv">
                    <Form onFinish={handelSubmit}>
                        <Form.Item
                            name="name"
                        >
                            <label>Tên công ty</label> <br />
                            {update === false ?
                                (<Input className='form--input' value={upUser.company_name} placeholder='Tên của bạn' disabled />) :
                                (<input className='form--input' type='text' name='company_name' value={upUser.company_name} placeholder='Tên của bạn' onChange={handelIpnut} />)}

                        </Form.Item>
                        <Form.Item>
                            <label></label> <br />
                            {update === false ?
                                (<img className='image--profile--user' src={`http://127.0.0.1:8000/storage/${upUser.logo}`} alt="" />)
                                : (<Input className='form--input' name='logo' type='file' onChange={handelAvatar}></Input>)}
                        </Form.Item>
                        <Form.Item
                            name={"scale"}
                        >
                            <label>Quy mô</label> <br />
                            {update === false ?
                                (<Input className='form--input' value={upUser.scale} placeholder='Quy mô của công ty bạn' disabled></Input>) :
                                (<input className='form--input' type='number' name='scale' value={upUser.scale} placeholder='Quy mô' onChange={handelIpnut} />)}

                        </Form.Item>
                        <Form.Item
                            name={"website"}
                        >
                            <label>Webiste </label> <br />
                            {update === false ?
                                (<Input className='form--input' value={upUser.website} placeholder='Trang web của công ty' disabled></Input>) :
                                (<input className='form--input' type='number' name='website' value={upUser.website} placeholder='Website' onChange={handelIpnut} />)}

                        </Form.Item>
                        
                        <Form.Item
                            name={"address"}
                        >
                            <label>Địa chỉ</label> <br />
                            {update === false ?
                                (<Input className='form--input' value={upUser.address} placeholder='Địa chỉ của bạn' disabled></Input>) :
                                (<input className='form--input' type='text' name='address' value={upUser.address} placeholder='Địa chỉ của bạn' onChange={handelIpnut} />)}

                        </Form.Item>
                        <Form.Item
                            name={"phone"}
                        >
                            <label>Số điện thoại</label> <br />
                            {update === false ?
                                (<Input className='form--input' value={upUser.number_phone} placeholder='Số điện thoại của bạn' disabled></Input>) :
                                (<input className='form--input' type='number' name='number_phone' value={upUser.number_phone} placeholder='Số điện thoại của bạn' onChange={handelIpnut} />)}

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
        </>
    )
}
export const ChangePassword = () => {
    const navigate=useNavigate()
    const token = JSON.parse(localStorage.getItem("login"));
    const [pass, setPass] = useState(false);
    const [error,setErorr]=useState({})
    const [id,setId]=useState({
        id:""
    });
    useEffect(() => {
        const getInfor = async () => {
            const companyValue = await getTokenUser(token.token)
            setId(companyValue.data.company.id)
        }
        getInfor()
    }, [])
    const [pass1,setPassword]=useState({
        password:""
    })
    const handelSubmit = async(e) => {
        e.preventDefault();
        let error={}
        if(pass1.password==""){
            error.password="Vui lòng nhập mật khẩu"
        }else{
            const status= await axios.post(`http://127.0.0.1:8000/api/user/compare-password/${id}`,pass1) 
            if(status.data.status==400){
                error.password=status.data.message
            }else if(status.data.status==200){
                setPass(true)
            }
        }
       setErorr(error)
    }
    const [password,setNewPass]=useState({
        password:""
    })
    const [confirm_password,setCon_Pass]=useState({
        password:""
    })
    const handelConfirm=async(e)=>{
        e.preventDefault();
        let error={}
        if(password.password==""){
            error.passwor="Vui lòng nhập mật khẩu"
        }else if(password.password.length<8){
            error.passwor="Mật khẩu phải có ít nhất 8 ký tự"
        }
        if(confirm_password.password!=password.password){
            error.passwo="Mật khẩu không khớp"
        }else if(confirm_password.password.length<8){
            error.passwo="Vui lòng xác nhập mật khẩu"
        }
        else{
            const status=await UserChangePassword(id,password)
            if(status.data.status==400){
                error.passwo='Không thể đổi mật khẩu'
            }else if(status.data.status==200){
               Swal.fire({
                title:"Tuyệt vời",
                text:"Đổi mật khẩu thành công",
                icon:"success"
            })
            .then(()=>{
                setPass(false)
            })
        }
            
            
        }
        setErorr(error)
    }
    return (
        <>
            {pass == false ?
                (<form onSubmit={handelSubmit} className='container--form--password'>
                    <label htmlFor="">Nhập mật khẩu</label> <br />
                        <input type='password' name='password' className='form--input' placeholder='Nhập mật khẩu' onChange={(e)=>setPassword({password:e.target.value})}/> <br />
                        <p className='password--error'>{error && error.password}</p>
                        <button type='submit' className='button--form'>OK</button>
                    
                </form>) :
                (
                    <form onSubmit={handelConfirm} className='container--form--password'>
                    <label htmlFor="">Mật khẩu mới</label> <br />
                    <input className='form--input' name='new_password' type='password' onChange={(e)=>setNewPass({password:e.target.value})}/>
                    <p className='password--error'>{error && error.passwor}</p>
                    <label htmlFor="">Xác thực mật khẩu</label><br />
                    <input className='form--input' name='confirm_password' type='password' onChange={(e)=>setCon_Pass({password:e.target.value})}/>
                    <p className='password--error'>{error && error.passwo}</p>
                        <button type='submit' className='button--form'>Cập nhật</button>
                   
                </form>)}
        </>
    )
}