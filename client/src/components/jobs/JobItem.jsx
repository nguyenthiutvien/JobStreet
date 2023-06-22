import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faBuilding,faDollarSign,faClock } from "@fortawesome/free-solid-svg-icons";
import "../../_style/components/JobCard.scss";

const JobItem = ({ position, type, company, address, logo,salary,id, time_close }) => {
  return (
    <div className="job__wrapper__card">
      <div className="job__wrapper__card--left">
        <img src={logo} alt="Icon" />
      </div>
      <div className="job__wrapper__card--line"></div>
      <div className="job__wrapper__card--right">
        <div className="job__wrapper__card--right__part-1">
        <p>{position}</p>
        <p>
            <FontAwesomeIcon icon={faBuilding} /> {company}
          </p>
          <p>
          <FontAwesomeIcon icon={faDollarSign} /> {salary}
          </p>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {address}
          </p>
          <p>
            <FontAwesomeIcon icon={faClock} /><span>Ngày đóng đơn: </span> {time_close}
          </p>
         
          
          <Link
            className={type === "full time" ? "full-time" : "half-time"}
            to={`/job-details/${id}`}
          >
            {type}E
          </Link>
        </div>
        <div className="job__wrapper__card--right__part-2">
          <i className="fa fa-heart-o"></i>
        </div>
      </div>
    </div>
  );
};

export default JobItem;