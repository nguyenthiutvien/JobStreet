import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faTelegram } from '@fortawesome/free-brands-svg-icons';
import '../Css/Footer.css';

const Footer = () => {
    return (
        <footer><br /><br />
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-3'>
                        <ul>
                            <li><h4><b>Jobstreet</b></h4></li>
                            <li>Về chúng tôi</li>
                            <li>Liên hệ</li>
                            <li>Thoả thuận </li>
                        </ul>
                    </div>
                    <div className='col-sm-3'>
                        <ul>
                            <li><h4><b>Dành cho Nhà tuyển dụng</b></h4></li>
                            <li>Liên hệ</li>
                            <li>Đăng tuyển dụng</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                    <div className='col-sm-3'>
                        <ul>
                            <li><h4><b>Dành cho ứng viên</b></h4></li>
                            <li>Tìm việc làm</li>
                            <li>Tìm thực tập</li>
                            <li>Việc làm theo Địa điểm</li>
                        </ul>
                    </div>
                    <div className='col-sm-3'>
                        <ul>
                            <li><h5><b>Chứng nhận</b></h5></li>
                            <li><a href='#'><img src='https://luatdonga.com/wp-content/uploads/2016/06/thong-bao-website-thuong-mai-dien-tu-voi-bo-cong-thuong.png' width='60%' height='50%' alt='certificate' /></a></li>
                            <li><h5><b>Kết nối với Jobstreet</b></h5></li>
                            <li className='icon'>
                                <p>
                                    <FontAwesomeIcon icon={faTwitter} />
                                    <FontAwesomeIcon icon={faFacebook} />
                                    <FontAwesomeIcon icon={faTelegram} />
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
