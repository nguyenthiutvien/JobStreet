import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApiData } from "../../api/Api";
import Loader from "../../components/services/Loader";
import JobDetailsItem from "./JobDetailsItem";
import "../../_style/pages/navHero.scss";
const JobDetails = () => {
  const { id } = useParams();
  const [loader, setloader] = useState(true);
  const [job, setjob] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchApiData(`api/home/${id}`);
      if (response.status === true) {
        setjob(response.data.job);
     
      } else {
        console.log(response);
      }
    };
    fetchData();
    setTimeout(() => {
      setloader(false);
    }, 3000);
  }, [id]);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {/* <NavBar job={job} cmp="jobs" /> */}
          <JobDetailsItem job={job} />
          {/* <Footer /> */}
        </>
      )}
    </>
  );
};

export default JobDetails;
