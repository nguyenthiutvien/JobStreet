import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Modal } from "../Authennitication/Application";
import "../../_style/components/_detailsJob.scss";
import "../../_style/pages/navHero.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import NavBar from "../pages/navigation/NavBar";
import NavHero from "../pages/navigation/NavHero";
import Loader from "../services/Loader";

const JobDetailsItem = ({ job ,hero}) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const handelApplication = () => {
    setOpenModal(true);
  };
  const handelLogin = () => {
    Swal.fire({
      title: "Đăng nhập",
      text: "Bạn có muốn đăng nhập?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Không",
      confirmButtonText: "Đăng nhập",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/loginUser");
      } else {
        setOpenModal(false);
      }
    });
  };
  const useLogined = JSON.parse(localStorage.getItem("login"));
  return (
    <>
      <div className="container">
      <NavHero job={job} hero={hero} />
        {/* {console.log(job)} */}
      </div>
      <section className="details_info">
        <div className="container">
          <div className="row">
            <div className="left">
              <h1>Mô tả công việc</h1>
              <div className="job-description">{job && job.description}</div>
              {useLogined === null ? (
                <Link className="btn btn-success" onClick={handelLogin}>
                  Ứng tuyển ngay
                </Link>
              ) : (
                <Link className="btn btn-success" onClick={handelApplication}>
                  Ứng tuyển ngay
                </Link>
              )}

              {openModal && <Modal closeModal={setOpenModal} job={job} />}
            </div>
            <div className="right">
              <h1>Địa chỉ công việc</h1>
              <div className="location-map">Map will be rendered here</div>
            </div>
          </div>
          {/* <Job  similar={true} /> */}
        </div>
      </section>
    </>
  );
};

export default JobDetailsItem;
