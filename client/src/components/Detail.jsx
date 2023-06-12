import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/companies/selectdata/${id}`);
      if (response.data) {
        setDetail(response.data[0]);
        console.log(response.data[0].company_name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          {detail && detail.logo && (
            <img src={".." + detail.logo} className="img-fluid rounded-start" alt="Company Logo" />
          )}
        </div>
        <div className="col-md-7">
          <h5 className="card-title">Tên: {detail?.company_name}</h5>
          <div className="row">
          <div className="col-md-6">
          <p className="card-text">Địa điểm: {detail?.address}</p>
          <p className="card-text">Số điện thoại: {detail?.number_phone}</p>
          </div>
          <div className="col-md-6">
          <p className="card-text">Vị trí: <small className="text-muted"> {detail?.positions}</small></p>
          <p className="card-text">Email: {detail?.email}</p>
          </div>
        </div>
        </div>
      </div><br></br><br></br>
      <div className="gioithieu">
        <h3>Thông tin công ty</h3>
        {detail && (
             <div className="card-text">
        Vị trí {detail.count > 0 ? detail.count : ''} {detail.positions}
      </div>
     )}
      </div>
    </div>
    
  );
}

export default Detail;
