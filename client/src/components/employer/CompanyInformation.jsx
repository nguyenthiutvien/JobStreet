import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Form, Input, Button } from 'antd';
import { getTokenCompany, updateCompanyInfo } from '../../api/Api';

export const CompanyInformation = () => {
  const [update, setUpdate] = useState(false)
  const [upCompany, setUpCompany] = useState({
      company_name:"",
      logo:"",
      description:"",
      scale:"",
      address:"",
      number_phone: "",
      website:""

  })
  const token = JSON.parse(localStorage.getItem("login"));
  useEffect(() => {
      const getInfor = async () => {
          const companyValue = await getTokenCompany(token.token)
          setUpCompany(companyValue.data.company)
          console.log("aa",companyValue.data.company);
      }
      getInfor()
  }, [])

  const handelIpnut = (e) => {
      const companyValue = { ...upCompany, [e.target.name]: e.target.value }
      setUpCompany(companyValue)
  }
  const handelAvatar = (e) => {
      const companyImg = e.target.files[0]
      setUpCompany({ ...upCompany, logo: companyImg })
  }
  const handelUpdate = () => {
      setUpdate(true)
  }
  const handelSubmit = async () => {
      const id = upCompany.id;
      const formData = new FormData()
      formData.append("comapany_name", upCompany.company_name)
      formData.append("logo", upCompany.logo)
      formData.append("logo", upCompany.description)
      formData.append("address", upCompany.address)
      formData.append("scale", upCompany.scale)
      formData.append("number_phone", upCompany.number_phone)
      formData.append("website", upCompany.website)
      const update = await updateCompanyInfo(id, formData, {
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
      <div className="card-container">
          <div className="container--table-inform">
              <div className="cv--title">
                  <p>Thông tin công ty</p>
              </div>
              <div className="list--cv">
                  <Form onFinish={handelSubmit}>
                      <Form.Item
                          name="company_name"
                      >
                          <label>Tên của cong ty</label> <br />
                          {update === false ?
                              (<Input className='form--input' value={upCompany.company_name} placeholder='Tên của công ty' disabled />) :
                              (<input className='form--input' type='text' name='company_name' value={upCompany.company_name} placeholder='Tên của công ty' onChange={handelIpnut} />)}

                      </Form.Item>
                    
                      <Form.Item
                          name={"address"}
                      >
                          <label>Địa chỉ</label> <br />
                          {update === false ?
                              (<Input className='form--input' value={upCompany.address} placeholder='Địa chỉ của bạn' disabled></Input>) :
                              (<input className='form--input' type='text' name='address' value={upCompany.address} placeholder='Địa chỉ của bạn' onChange={handelIpnut} />)}

                      </Form.Item>
                      <Form.Item
                          name={"description"}
                      >
                          <label>Mô tả công ty</label> <br />
                          {update === false ?
                              (<Input className='form--input' value={upCompany.description} placeholder='Mô tả của công ty bạn' disabled></Input>) :
                              (<input className='form--input' type='text' name='description' value={upCompany.description} placeholder='Mô tả của công ty bạn' onChange={handelIpnut} />)}

                      </Form.Item>
                      <Form.Item
                          name={"number_phone"}
                      >
                          <label>Số điện thoại</label> <br />
                          {update === false ?
                              (<Input className='form--input' value={upCompany.number_phone} placeholder='Số điện thoại của bạn' disabled></Input>) :
                              (<input className='form--input' type='number' name='number_phone' value={upCompany.number_phone} placeholder='Số điện thoại của bạn' onChange={handelIpnut} />)}

                      </Form.Item>
                      <Form.Item>
                          <label>Ảnh đại diện</label> <br />
                          {update === false ?
                              (<img className='image--profile--user' src={`http://127.0.0.1:8000/storage/${upCompany.logo}`} alt="" />)
                              : (<Input className='form--input' name='logo' type='file' onChange={handelAvatar}></Input>)}
                      </Form.Item>
                       <Form.Item
                            name={"scale"}
                          >
                            <label>Quy mô</label> <br />
                            {update === false ? (
                              <Input
                                className='form--input'
                                value={upCompany.scale}
                                placeholder='Quy mô'
                                disabled
                              />
                            ) : (
                              <input
                                className='form--input'
                                type='text'
                                name='scale'
                                value={upCompany.scale}
                                placeholder='Quy mô'
                                onChange={handelIpnut}
                              />
                            )}
                          </Form.Item>
                          <Form.Item
                            name={"website"}
                          >
                            <label>Website</label> <br />
                            {update === false ? (
                              <Input
                                className='form--input'
                                value={upCompany.website}
                                placeholder='Website'
                                disabled
                              />
                            ) : (
                              <input
                                className='form--input'
                                type='text'
                                name='website'
                                value={upCompany.website}
                                placeholder='Website'
                                onChange={handelIpnut}
                              />
                            )}
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
          </div>
      </>
  )}