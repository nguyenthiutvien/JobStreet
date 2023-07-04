import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faBuilding,
  faDollarSign,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "../_style/components/companyJob.scss"
import axios from "axios";

function Timvieclam() {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/companies/selectdata/${id}`);
        setDetail(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className="container--height">
       <div className="featured--job">
        {detail.map((item) => (
          <div className="container--detail">
              <div className="job--wrapper--card__left">
                <img src={`http://127.0.0.1:8000/storage/${item.logo}`} alt="Icon" />
              </div>
              <div className="job--wrapper--card--right">
                <div className="job--wrapper--card--right--part-1">
                  <b>{item.position}</b>
                  <p>
                    <FontAwesomeIcon icon={faBuilding} /> {item.company_name}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faDollarSign} /> {item.salary}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {item.address}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faClock} />
                    <span> Ngày đóng đơn: </span> {item.close_day}
                  </p>

                  <Link
                    className={
                      item.type === "full time"
                        ? "vien-btn btn btn-success"
                        : "btn btn-success"
                    }
                    to={`/job-details/${item.job_id}`} 
                  
                  >
                    {item.type}
                  </Link>
                </div>
              </div>
              </div>
             
       
        ))}
        </div>
      </div>
     
     
    </>
  );
}

export default Timvieclam;
{/* <div className="item_tvl">
<div className="context">
  <img className="card-img-top-img" src={`http://127.0.0.1:8000/storage/${item.logo}`} alt="..." />
  <h5 >
  <div className="company_name"><Link  to={`/detail/${item.id}`}>{item.company_name}
    </Link></div>
  </h5>
  
</div>
<div className="body_tvl">
   <h5 className="text_tvl">  {item.positions}</h5>
    <h5 className="text_tvl"> <FontAwesomeIcon icon={faDollarSign} />  {item.salary}</h5>
    <h5 className="text_tvl"><FontAwesomeIcon icon={faClock} />  {item.close_day}</h5>
  <h4 className="text_tvl_type"> <Link to={'/jobs'} ><h4> {item.type}</h4></Link></h4>
</div>
</div> */}