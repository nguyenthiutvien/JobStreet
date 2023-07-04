import { useEffect, useState } from "react";
import { getTokenUser,updateUser } from "../../api/Api";
import { Form,Input,Button } from "antd";
export const MyInformation = () => {
    const [update, setUpdate] = useState(false)
    const [upUser, setUpUser] = useState({
        username: "",
        address: "",
        number_phone: "",
        avatar: ""
    })
    const token = JSON.parse(localStorage.getItem("login"));
    useEffect(() => {
        const getInfor = async () => {
            const userValue = await getTokenUser(token.token)
            setUpUser(userValue.data.user)
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
        if(update){
            setUpdate(false)
        }

    }
    return (
        <>
            <div className="container--table-inform">
                <div className="cv--title">
                    <b>Thông tin cá nhân</b>
                </div>
                <br />
                <div className="list--cv">
                    <Form onFinish={handelSubmit}>
                        <Form.Item>
                            {update === false ?
                                (<img className='image--profile--user' src={`http://127.0.0.1:8000/storage/${upUser.avatar}`} alt="" />)
                                : (<Input className='form--input' name='avatar' type='file' onChange={handelAvatar}></Input>)}<br /> <br />
                            <label><b>Ảnh đại diện</b></label> 
                        </Form.Item>
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
                            {update === false ? (
                                <Button type="primary" className="edit--button" onClick={handelUpdate} htmlType="button">
                                    Sửa
                                </Button>
                            ) : (
                                <Button type="primary" className="update--button" htmlType="submit">
                                    Cập nhật
                                </Button>
                            )}
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </>
    )
}