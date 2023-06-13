import React, { useState } from 'react'
import "../_styles/application.scss"
import { Form, Input, Button } from "antd"
import Swal from "sweetalert2"
export const Application = () => {
    const [openModal, setOpenModal] = useState(false)
    const handelApllication = () => {
        setOpenModal(true)
    }
    return (
        <div>
            <button onClick={handelApllication} className='ApplicatinModal' style={{ background: "yellow" }}>Nộp đơn</button>
            {openModal && <Modal closeModal={setOpenModal} />}
        </div>
    )
}

export const Modal = ({ closeModal }) => {

    const [values,setValues]=useState({
        name: "",
        email: "",
        cover_letter: "",
        file_cv:""
    })
    const handelInput=(e)=>{
        const value={...values,[e.target.name]:e.target.value}
        setValues(value)
    }
    const handelFile=(e)=>{
        const files=e.target.files[0]
        setValues({...values,file_cv:files})
    }

    const handelLogin=()=>{
        Swal.fire("Đăng nhập","Vui lòng đăng nhập trước khi nộp CV","error")
    }
    const handelSubmit=()=>{
        const formData=new FormData()
        formData.append("name",values.name)
        formData.append("email",values.email)
        formData.append("cover_letter",values.cover_letter)
        formData.append("file_cv",values.file_cv)
        
        console.log(...formData)
    }

    const useLogined=JSON.parse(localStorage.getItem("user"))
    return (

        <div className="container--modal">
            <div className="modal--title">
                <h3>Ứng tuyển ngay:</h3>
            </div>
            <div className="modal--form">
            <Form onFinish={handelSubmit}>
                <Form.Item
                    name="name"
                    rules={[{
                        required: true,
                        message: 'Vui lòng tên của bạn'
                    }]}
                    hasFeedback
                >
                    <Input name="name" placeholder='Nhâp họ và tên viết hoa' className='form--values' onChange={handelInput}/>
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email'
                        }
                    ]}
                    hasFeedback
                    >
                    <Input name="email" placeholder='Nhâp đúng email của bạn' className="form--values" onChange={handelInput}/>
                </Form.Item>
                <Form.Item
                    name="cover_letter"
                >
                    <Input.TextArea name="cover_letter" rows={4} placeholder='Viết thư nguyện vọng' onChange={handelInput}></Input.TextArea>
                </Form.Item>
                <Form.Item
                    name="file_cv"
                    rules={[{
                        required: true,
                        message: 'Vui lòng đính kèm file'
                    }]}
                >
                    <Input type='file' name="file_cv" placeholder='Đính kèm file' className='form--values' onChange={handelFile}></Input>
                </Form.Item>
                <div className="form--button--application">
                <Form.Item>
                {useLogined === null ?(
                    <Button type="primary" htmlType="button" className="modal--submit" onClick={handelLogin}>
                        Nộp Ngay
                    </Button>
                ):(
                    <Button type="primary" htmlType="submit" className="modal--submit">
                        Nộp Ngay
                    </Button>
                )
                    
                }
                    <Button onClick={()=>closeModal(false)} className="modal--cancel">
                        Hủy
                    </Button>
                </Form.Item>
                </div>
                
            </Form>
            </div>
         
        </div>

            
    )
}
{/* <button onClick={()=>closeModal(false)}>X</button>
           <div className="container--modal">
            <div className="container--modal--content">
                <div className="container--modal--content--title">
                    <h1>Nộp đơn</h1>
                </div>
                <div className="container--modal--content--description">
                    <p>Nộp đơn của bạn đã đăng ký</p>
                </div>
            </div>
            <button onClick={()=>closeModal(false)}>Cancel</button>
           </div> */}
     