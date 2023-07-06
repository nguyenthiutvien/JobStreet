import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../_style/components/Blog/company.scss";

function Company() {
  const [show, setshow] = useState([]);
  const [search, setSearch] = useState("");
  // const navigate = useNavigate();
  useEffect(() => {
    data();
  }, []);

  const data = async () => {
    try {
      const data = await axios.get(
        "http://127.0.0.1:8000/api/companies/selectdata"
      );
      setshow(data.data);
      // console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filter = show.filter((item) =>
    item.company_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* <NavBar/> */}
      <div>
        <div className="container">
          <div className="row  d-flex justify-content-center">
            <h1>Danh sách công ty</h1>
            <div className="col-sm-6">
              <input
                id="searchinput"
                placeholder="Nhập từ khóa"
                type="text"
                class="form-control"
                onChange={handleSearch}
              />
            </div>
          </div>
          

          <div className="cards">
            {filter &&
              filter.map((item) => (
                <Link to={`/detailCompany/${item.id}`} className="linka" key={item.id}>
                  <div className="content">
                    <div className="item">
                      <img src={`http://127.0.0.1:8000/storage/${item.logo}`} />
                      <div className="company_name">
                        <Link className="none" to={`/detailCompany/${item.id}`}>
                          {item.company_name}
                        </Link>
                      </div>

                    </div>
                    <div className="item">
                      <div>
                        <svg
                          data-testid="icon-svg"
                          className="IconStyle"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          viewBox="0 0 100 100"
                        >
                          <path
                            d="M100,0 L100,100 L73.9128906,100 
                        L73.9128906,69.5652344 L56.5216797,69.5652344 L56.5216797,100 L0,100 L0,36.9564453 L30.4347656,36.9564453 L30.4347656,0 L100,0 Z M30.4347656,43.4783203 L6.52167969,43.4783203 L6.52167969,93.4783203 
                        L30.4347656,93.4783203 L30.4347656,43.4783203 Z M23.9130859,69.5652344 L23.9130859,78.2609375 L13.0435547,78.2609375 L13.0435547,69.5652344 L23.9130859,69.5652344 Z M50,69.5652344 L41.3042969,69.5652344 L41.3042969,78.2609375 
                        L50,78.2609375 L50,69.5652344 Z M89.1304688,69.5652344 L80.4347656,69.5652344 L80.4347656,78.2609375 L89.1304688,78.2609375 L89.1304688,69.5652344 Z M23.9130859,52.1738281 L23.9130859,60.8695312 L13.0435547,60.8695312 L13.0435547,52.1738281 L23.9130859,52.1738281 Z M50,52.1738281 L41.3042969,52.1738281 L41.3042969,60.8695312 L50,60.8695312 L50,52.1738281 Z M69.5652344,52.1738281 L60.8695312,52.1738281 L60.8695312,60.8695312 L69.5652344,60.8695312 L69.5652344,52.1738281 Z M89.1304688,52.1738281 L80.4347656,52.1738281 L80.4347656,60.8695312 L89.1304688,60.8695312 L89.1304688,52.1738281 Z M50,34.7826172 L41.3042969,34.7826172 L41.3042969,43.4783203 L50,43.4783203 L50,34.7826172 Z M69.5652344,34.7826172 L60.8695312,34.7826172 L60.8695312,43.4783203 L69.5652344,43.4783203 L69.5652344,34.7826172 Z M89.1304688,34.7826172 L80.4347656,34.7826172 L80.4347656,43.4783203 L89.1304688,43.4783203 L89.1304688,34.7826172 Z M50,17.3914063 L41.3042969,17.3914063 L41.3042969,26.0869141 L50,26.0869141 L50,17.3914063 Z M69.5652344,17.3914063 
                        L60.8695312,17.3914063 L60.8695312,26.0869141 L69.5652344,26.0869141 L69.5652344,17.3914063 Z M89.1304688,17.3914063 L80.4347656,17.3914063 L80.4347656,26.0869141 L89.1304688,26.0869141 L89.1304688,17.3914063 Z"
                          ></path>
                        </svg>
                      </div>
                      <div className="inform">{item.address}</div>
                    </div>
                    <div className="item">
                      <div>
                        <svg
                          data-testid="icon-svg"
                          className="IconStyle"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          viewBox="0 0 100 100"
                        >
                          <path
                            d="M37.4726562,59.9636719 L37.4726562,68.8853516 C37.4726562,69.8521484 37.8257812,70.6894531 
                        38.5320313,71.3945313 C39.1841346,72.0473558 39.9467409,72.3982942 40.8209256,72.4484219 L41.0417969,72.4546875 L58.8857422,72.4546875 C59.8523437,72.4546875 60.6892578,72.1017578 61.3957031,71.3945313 C62.0470853,70.7435096 62.3985785,69.979988 62.4488,69.106117
                         L62.4550781,68.8853516 L62.4550781,59.9636719 L99.9271484,59.9636719 L99.9271484,86.7300781 C99.9271484,89.1832031 99.0542969,91.2832031 97.3064453,93.0302734 C95.6386009,94.6981179 93.6488261,95.5699457 91.3378006,95.6457568 L91.0054688,95.6511719 L8.92226563,95.6511719
                          C6.46855469,95.6511719 4.36777344,94.7775391 2.62070312,93.0302734 C0.95267223,91.3626154 0.0811918905,89.373383 0.0054127499,87.0624064 L0,86.7300781 L0,59.9636719 L37.4726562,59.9636719 Z M57.1019531,59.9636719 L57.1019531,67.1013672 L42.8253906,67.1013672 L42.8253906,59.9636719 
                          L57.1019531,59.9636719 Z M66.0236328,5 C67.5101562,5 68.7748047,5.52070312 69.8148437,6.56113281 C70.8560547,7.60214844 71.3761719,8.86582031 71.3761719,10.3529297 L71.3761719,10.3529297 L71.3761719,21.2753906 L91.0052734,21.2753906 C93.4583984,21.2753906 95.5591797,22.1486328 97.30625,23.8960938 C99.0542969,25.6433594 99.9269531,27.7429688 99.9269531,30.1966797 L99.9269531,30.1966797 L99.9269531,51.6099609 L0,51.6099609 L0,30.1966797 C0,27.7429688 0.873242188,25.6433594 2.62070313,23.8960938 C4.36796875,22.1486328 6.46875,21.2753906 8.92226563,21.2753906 L8.92226563,21.2753906 L28.5509766,21.2753906 L28.5509766,10.3529297 C28.5509766,8.865625 29.0710938,7.6015625 30.1123047,6.56113281 C31.1535156,5.52070312 32.4173828,5 33.9041016,5 L33.9041016,5 Z M64.2390625,12.1373047 L35.6884766,12.1373047 L35.6884766,21.2753906 L64.2390625,21.2753906 L64.2390625,12.1373047 Z"
                          ></path>
                        </svg>
                      </div>
                      <div className="job">
                        {" "}
                        <Link
                          activeclassName="active"
                          style={{ textDecoration: "none" }}
                          to={`/companyJob/${item.id}`}
                        >
                          {item.count > 0 ? item.count : ""}{" "}
                          {"vị trí đang tuyển"}
                        </Link>
                      </div>

                      <div></div>
                    </div>
                    <div className="item">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="IconStyle"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                        </svg>
                      </div>
                      <div className="time">{item.number_phone}</div>
                      <div></div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
}
export default Company;
