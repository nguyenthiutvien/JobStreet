import React, { useEffect, useState } from "react";
import { fetchApiData } from "../../api/Api";
import Loader from "../../components/services/Loader";
import Footer from "../footer/Footer";
import JobItemSection from "./JobItemSection";
import NavBar from "./navigation/NavBar";


const AllJobs = () => {
  const [loader, setloader] = useState(true);
  const [jobs, setjobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchApiData(`api/home/browse`);
      if (response.status === true) {
        setjobs(response.data.jobs);
        
      } else {
        console.log(response);
      }
    };
    fetchData();
    setTimeout(() => {
      setloader(false);
    }, 300);
  }, []);

  return (
    <>
      {(loader && <Loader />) || (
        
        <>
          <NavBar hero="jobs" cmp="jobs" />
          <JobItemSection jobs={jobs} />
          <Footer />
        </>
      )}
    </>
  );

};


export default AllJobs;
