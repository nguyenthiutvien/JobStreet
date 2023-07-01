import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getTokenUser } from "../../api/Api";
export const TabBar = ({handelLogout,handelBack}) => {
    const [user, setUser] = useState([]);
    const token = JSON.parse(localStorage.getItem("login"));
    useEffect(() => {
        const getInfor = async () => {
            const userValue = await getTokenUser(token.token)
            console.log(userValue.data)
            setUser(userValue.data.user)
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
                        <li><Link className='color' onClick={handelBack}>Trang chủ</Link></li>
                        <li><Link className='color' to={""} >Nộp đơn</Link></li>
                        <li><Link className='color' to={"infomation"}>Thông tin</Link></li>
                        <li><Link className='color' to={"change-password"}>Đổi mật khẩu</Link></li>
                        <li><Link className='color' onClick={handelLogout}>Đăng xuất</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}