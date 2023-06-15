import React, { useState } from "react";
import { Link } from "react-router-dom";
import Job from "../jobs/Jobs";
import Swal from "sweetalert2";
import { Modal } from "../../containers/Application";
const JobDetailsItem = ({ job }) => {

  const [openModal, setOpenModal]=useState(false)
 const handelApplication = ()=>{
    setOpenModal(true);
 }
 const handelLogin=()=>{
  Swal.fire("Đăng nhập","Vui lòng đăng nhập trước khi nộp CV","error")
}
 const useLogined=JSON.parse(localStorage.getItem("login"))
  return (
    <section className="details_info">
      <div className="container">
        <div className="row">
          <div className="left">
            <h1>Mô tả công việc</h1>
            <div className="job-description">{job && job.description}</div>
            {useLogined ===null?(
              <Link className="button" onClick={handelLogin}>
              Ứng tuyển ngay
            </Link>
            ):(
              <Link className="button" onClick={handelApplication}>
              Ứng tuyển ngay
            </Link>
            )}
           
            {openModal && <Modal closeModal={setOpenModal} job={job}/>}
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
