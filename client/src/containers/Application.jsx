import React, { useState } from 'react'
import "../_styles/application.scss"
import { Form, Input, Button } from "antd"
import { postApplication } from '../api/Api'
import Swal from "sweetalert2"
export const Modal = ({ closeModal, job }) => {
    const [values, setValues] = useState({
        position: job.position,
        job_id: job.id,
        name: "",
        email: "",
        cover_letter: "",
        file_cv: ""
    })
    const handelInput = (e) => {
        const value = { ...values, [e.target.name]: e.target.value }
        setValues(value)
    }
    const handelFile = (e) => {
        const files = e.target.files[0]
        setValues({ ...values, file_cv: files })
    }
    const email=JSON.parse(localStorage.getItem("login")) 
    const handelSubmit = async () => {
        const formData = new FormData()
        formData.append("position", values.position)
        formData.append("job_id", values.job_id)
        formData.append("name", values.name)
        formData.append("token", email.token)
        formData.append("cover_letter", values.cover_letter)
        formData.append("cv", values.file_cv)
        formData.append("status", "Đã nhận")
        const status = await postApplication(formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(...formData)
        Swal.fire({
            title:"Chúc mừng",
            text:"Nộp đơn thành công",
            icon:"success"
        }).then(()=>{
            closeModal(false)
        })
    }
    return (
            <div className="container--modal">
                <div className="modal--title">
                    <p>Ứng tuyển ngay vị trí <b>{job.position}</b> của công ty <b>{job.company.company_name}</b></p>
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
                            <Input name="name" placeholder='Nhâp họ và tên viết hoa' className='form--values' onChange={handelInput} />
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
                            <Input name="email" placeholder='Nhâp đúng email của bạn' className="form--values" onChange={handelInput} />
                        </Form.Item>
                        <Form.Item
                            name="cover_letter"
                        >
                            <Input.TextArea name="cover_letter" rows={4} placeholder='Viết thư nguyện vọng' onChange={handelInput}></Input.TextArea>
                        </Form.Item>
                        <label htmlFor="file_cv">Đính kèm CV của bạn</label>
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
                            <div className="btn--group">
                                <Button  htmlType="submit" className="modal--submit">
                                    Nộp Ngay
                                </Button>
                                <Button onClick={() => closeModal(false)} className="modal--cancel">
                                    Hủy
                                </Button>
                            </div>
                            </Form.Item>
                        </div>

                    </Form>
                </div>

            </div>
    )
}

