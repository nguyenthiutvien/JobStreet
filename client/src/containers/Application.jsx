import React, { useState } from 'react'
import "../_styles/application.scss"
import { Form, Input, Button } from "antd"
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
        image:""
    })

    const [file,setFile]=useState("")

    const handelInput=()=>{
        const value={...values,[e.target.name]:e.target.value}
        setValues(value)
    }
    const handelFile=(e)=>{
        const file=e.target.files[0]
        setFile({...values,image:file})
    }

    const handelSubmit=(e)=>{
        
        
    }
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
                    <Input type='file' placeholder='Đính kèm file' className='form--values' onChange={handelFile}></Input>
                </Form.Item>
                <div className="form--button--application">
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="modal--submit">
                        Nộp Ngay
                    </Button>
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
     