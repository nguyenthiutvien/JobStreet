import React from "react";
import { Link } from "react-router-dom";
import Job from "../jobs/Jobs";
const JobDetailsItem = ({ job }) => {
  
  return (
    <section className="details_info">
      <div className="container">
        <div className="row">
          <div className="left">
            <h1>Mô tả công việc</h1>
            <div className="job-description">{job && job.description}</div>
            <Link className="button" to="/">
              Ứng tuyển ngay
            </Link>
          </div>
          <div className="right">
            <h1>Địa chỉ công việc</h1>
            <div className="location-map">Map will be rendered here</div>
          </div>
        </div>
        {/* <Job  similar={true} /> */}
      </div>
    </section>
  );
};

export default JobDetailsItem;
