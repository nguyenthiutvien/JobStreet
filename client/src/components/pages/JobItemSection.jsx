import React from "react";


import JobItem from "../jobs/JobItem";
import SearchJob from "../jobs/SearchJob";

const JobItemSection = ({ jobs }) => {
 
  console.log("why",jobs);
  
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-2">
        <SearchJob/>
        </div>
        <div className="col-sm-10">
        
    <div className="featured_job">
      <div className="container">
        <div className="featured_job--wrapper">
          {jobs &&
            jobs.map((item, index) => (
              <JobItem
                position={item.position}
                type={item.type}
                salary = {item.salary}
                company ={item.company.company_name}
                address = {item.company.address}
                logo = {item.company.logo}
                id ={item.id}
                description ={item.description}
                time_created = {item.created_at}
                time_close ={item.close_day}
              />
            ))}
        </div>
        <div className="load-data">
          <button className="button">Browse More</button>
        </div>
      </div>
    </div>
        </div>
      </div>

    
    </div>
  );
};

export default JobItemSection;
