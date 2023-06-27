import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Job from "../jobs/Jobs";
import Swal from "sweetalert2";
import { Modal } from "../../containers/Application";
const JobDetailsItem = ({ job }) => {
  const navigate=useNavigate()
  const [openModal, setOpenModal]=useState(false)
 const handelApplication = ()=>{
    setOpenModal(true);
 }
 const handelLogin=()=>{
  Swal.fire({
    title: "Đăng nhập",
    text: "Bạn có muốn đăng nhập?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Không",
    confirmButtonText: "Đăng nhập",
  }).then((result)=>{
    if(result.isConfirmed){
      navigate("/loginUser")
    }else{
      setOpenModal(false);
    }
    
  })
}
 const useLogined=JSON.parse(localStorage.getItem("login"))

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
