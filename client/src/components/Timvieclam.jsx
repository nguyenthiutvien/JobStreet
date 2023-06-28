import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign , faLocationDot,faClock} from '@fortawesome/free-solid-svg-icons';
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
      if (response.data && response.data.length > 0) {
        setDetail(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="content_tvl">
        {detail.map((item) => (
          <div className="item_tvl"  key={item.id}>
            <div className="context">
              <img className="card-img-top-img" src={`http://127.0.0.1:8000/storage/${item.logo}`} alt="..." />
              <h5 >< div className="company_name"><Link  to={`/detail/${item.id}`}>{item.company_name}
                </Link></div></h5>
              
            </div>
            <div className="body_tvl">
               <h5 className="text_tvl">  {item.positions}</h5>
                <h5 className="text_tvl"> <FontAwesomeIcon icon={faDollarSign} />  {item.salary}</h5>
                <h5 className="text_tvl"><FontAwesomeIcon icon={faClock} />  {item.close_day}</h5>
              <h4 className="text_tvl_type"> <Link to={'/jobs'} ><h4> {item.type}</h4></Link></h4>
            </div>
          </div>
        ))}
      </div>
     
    </>
  );
}

export default Timvieclam;

