import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {Link } from 'react-router-dom';
import '../../src/_style/components/Blog/Detail.scss';

function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/companies/selectdata/${id}`);
      if (response.data) {
        setDetail(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container_detail">
      <div className="company_detail">
      {detail.slice(0, 1).map((detail) => (
        <div className="row">
          <div className="col-md-3">
            <img src={`http://127.0.0.1:8000/storage/${detail.logo}`} className="img-fluid rounded-start" />
          </div>
          <div className="col-md-7">
            <h5 className="card-title" style={{ fontSize: '38px', fontWeight: 'bold' }}>{detail.company_name}</h5>
            <br />
            <div className="row">
              <div className="col-md-6">
                <p className="card-text"><span><h5>Địa điểm:</h5></span> {detail?.address}</p>
                <p className="card-text"><span><h5>Số điện thoại:</h5></span> {detail?.number_phone}</p>
              </div>
              <div className="col-md-6">
                <p className="card-text"><span><h5>Website: </h5></span>{detail?.website}</p>
                <p className="card-text"><span><h5>Quy mô:</h5></span> {detail?.scale} nhân viên</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
      <br /><br /><br /><br /><br />
  
      <h3>Thông tin công ty</h3> <br />
  
      <div className="gioithieu">
        <h5>Giới thiệu</h5>
        <div className="row_gioithieu">
          {detail.slice(0, 1).map((detail) => (
            <div className="card-text">
              <p className="card-text">{detail.description}</p>
            </div>
          ))}
        </div>
      </div>
      <br />
      <div className="gioithieu">
        <h5>Địa chỉ văn phòng</h5>
        <div className="row_gioithieu">
          {detail.slice(0, 1).map((detail) => (
            <div className="card-text">
              <p className="card-text">{detail.address}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="gioithieu"><br />
        <h5>Việc làm</h5>
        <div className="row_gioithieu">
          {detail.map((detail) => (
            <div className="row-vieclam">
              <div className="job_position">  <Link activeclassName="active" to={`/job-details/${detail.job_id}`}>{detail.positions} </Link></div>
              <p className="card-text">{detail.address}</p>
              
              <hr />
            </div>
          ))}
        </div>
      </div><br></br>
      <div className="btn btn-primary" >  <Link activeclassName="active" to={`/jobs`}>Xem tất cả việc làm</Link></div>
    </div>
  );
  
}

export default Detail;
