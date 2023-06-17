import React, { useEffect, useState } from 'react'
import "../../_style/user/tabbar.scss";
import { Link, useNavigate } from "react-router-dom"
import { Table, Form, Input, Button } from "antd"
import { getApplications, confirmEmail, updateUser,UserChangePassword } from '../../api/Api';
import Swal from 'sweetalert2';
export const UserProfile = () => {
    const navigate=useNavigate()
    const [content, setContent] = useState(<Apply></Apply>)
    const handelInfor = () => {
        setContent(<MyInformation></MyInformation>)
    }
    const changePassword = () => {
        setContent(<ChangePassword></ChangePassword>)
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
                navigate("/userProfile")
            }
        })
    }
    return (
        <>
            <div className="container--user--profile">
                <div className="user--profile--left">
                    <TabBar handelInfor={handelInfor} changePassword={changePassword} handelLogout={handelLogout}></TabBar>
                </div>
                <div className="user--profile--content">
                    {content}
                </div>
            </div>
        </>
    )
}
export const TabBar = ({ handelInfor, changePassword ,handelLogout}) => {
    const [user, setUser] = useState([]);
    const email = JSON.parse(localStorage.getItem("login"));
    useEffect(() => {
        const getInfor = async () => {
            const userValue = await confirmEmail(email.email)
            setUser(userValue.data)
        }
        getInfor()
    }, [])
    return (
        <div>
            <div className="container--tabbar">
                <div className="tabbar--image">
                    <div className="image--profile">
                        <img src={`http://127.0.0.1:8000/storage/${user.avatar}`} alt="" />
                    </div>
                    <div className="user--name">
                        <p>{user.username}</p>
                    </div>
                </div>
                <div className="tabbar--drop--down">
                    <ul>
                        <li><Link className='color'>Nộp đơn</Link></li>
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
            title: "Tên công ty",
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
    ]
    return (
        <>
            <div className="container--table--cv">
                <div className="cv--title">
                    <p>Danh sách công ty ứng tuyển</p>
                </div>
                <div className="list--cv">
                    <Table dataSource={apply} columns={columns}>
                    </Table>
                </div>
            </div>
        </>
    )
}
export const MyInformation = () => {
    const [update, setUpdate] = useState(false)
    const [upUser, setUpUser] = useState({
        username: "",
        address: "",
        number_phone: "",
        avatar: ""
    })
    const email = JSON.parse(localStorage.getItem("login"));
    useEffect(() => {
        const getInfor = async () => {
            const userValue = await confirmEmail(email.email)
            setUpUser(userValue.data)
        }
        getInfor()
    }, [])

    const handelIpnut = (e) => {
        const userValue = { ...upUser, [e.target.name]: e.target.value }
        setUpUser(userValue)
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
        formData.append("username", upUser.username)
        formData.append("avatar", upUser.avatar)
        formData.append("number_phone", upUser.number_phone)
        formData.append("address", upUser.address)
        const update = await updateUser(id, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(update.data)
        console.log(upUser)
    }
    return (
        <>
            <div className="container--table-inform">
                <div className="cv--title">
                    <p>Thông tin cá nhân</p>
                </div>
                <div className="list--cv">
                    <Form onFinish={handelSubmit}>
                        <Form.Item
                            name="name"
                        >
                            <label>Tên của bạn</label> <br />
                            {update === false ?
                                (<Input className='form--input' value={upUser.username} placeholder='Tên của bạn' disabled />) :
                                (<input className='form--input' type='text' name='username' value={upUser.username} placeholder='Tên của bạn' onChange={handelIpnut} />)}

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
                            <label>Ảnh đại diện</label> <br />
                            {update === false ?
                                (<img src={`http://127.0.0.1:8000/storage/${upUser.avatar}`} alt="" />)
                                : (<Input className='form--input' name='avatar' type='file' onChange={handelAvatar}></Input>)}
                        </Form.Item>
                        <Form.Item>
                            {update === false ?
                                (<button type="primary" onClick={handelUpdate} htmlType="button">
                                    Sửa
                                </button>) :
                                (<Button type="primary" htmlType="submit">
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
    const [user, setUser] = useState([]);
    const email = JSON.parse(localStorage.getItem("login"));
    const [pass, setPass] = useState(false);
    useEffect(() => {
        const getInfor = async () => {
            const userValue = await confirmEmail(email.email)
            setUser(userValue.data)
        }
        getInfor()
    }, [])

    const comparePass = (rule, value) => {
        if (user.password === value) {
            return Promise.resolve();
        }
        return Promise.reject('Mật khẩu không đúng');
    }

    const handelSubmit = (e) => {
        setPass(true)
    }

    const handelConfirm=async(e)=>{
        const id=user.id
        const status=await UserChangePassword(id,e)
        Swal.fire({
            title:"Tuyệt vời",
            text:"Đổi mật khẩu thành công",
            icon:"success"
        }).then(()=>{
            navigate("/userProfile")
        })
        
    }
    return (
        <>
            {pass == false ?
                (<Form onFinish={handelSubmit} className='container--form--pass'>
                    <label htmlFor="">Nhập mật khẩu</label>
                    <Form.Item
                        name={"password"}
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập mật khẩu'
                        },
                        {
                            validator: comparePass
                        }]}
                        hasFeedback
                    >
                        <Input.Password className='form--input' placeholder='Nhập mật khẩu' />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit'>OK</Button>
                    </Form.Item>
                </Form>) :
                (
                    <Form onFinish={handelConfirm} className='container--form--pass'>
                    <label htmlFor="">Mật khẩu mới</label> <br />
                    <Form.Item
                        name={"passwor"}
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập mật khẩu'
                        },{
                            min:8,
                            message:"Mật khẩu phải trên 8 ký tự"
                        }]}
                        hasFeedback
                    >
                       
                        <Input.Password className='form--input' />
                    </Form.Item>

                    <div>
                    <label htmlFor="">Xác thực mật khẩu</label><br />
                    <Form.Item
                        name={"confirm_pass"}
                        dependencies={["passwor"]}
                        rules={[{
                            required:true,
                            message:"Xác thực không được bỏ rỗng"
                        },({getFieldValue})=>({
                            validator(_,value){
                                if(!value || getFieldValue("passwor")===value){
                                    return Promise.resolve();
                                }
                                return Promise.reject("Xác thực không đúng")
                            }
                        })]}
                        hasFeedback
                    >
                  
                        <Input.Password className='form--input' />
                    </Form.Item>
                    </div>
                    
                    <Form.Item>
                        <Button htmlType='submit'>Cập nhật</Button>
                    </Form.Item>
                </Form>)}



        </>
    )
}