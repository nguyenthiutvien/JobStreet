import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
        console.log(response.data)
      }
    // console.log(response.positions); 
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <div className="row_content">
      {detail.map((item)=>(
      <div className="card_content" style={{width: '18rem'}} key={item.id}>
      <img className="card-img-top-img" src={`http://127.0.0.1:8000/storage/${item.logo}`}  alt="..." />
      <div className="card-body">
        <h5 className="card-title">{item.company_name}</h5>
        <h5 className="card-text">Lương:{item.salary}$</h5>
        <h5 className="card-text">Vị trí:{item.positions}</h5>
      </div>
    </div>
    ))}
    </div>
    <div className="ungtuyen">
      <h4>Ứng tuyển nhanh</h4>
    </div>

    </>
  );
 
}
export default Timvieclam;
