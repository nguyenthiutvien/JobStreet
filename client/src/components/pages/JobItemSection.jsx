import React, { useEffect, useState } from 'react';
import JobItem from '../jobs/JobItem';
import '../../_style/components/Search.scss';

const JobItemSection = ({ jobs }) => {
  const [search, setSearch] = useState([]);
  useEffect(() => {
    handleSearch();
  }, [jobs]);

  const handleSearch = () => {
    const allJobs = jobs.map((item) => ({
      id: item.id,
      position: item.position,
      salary: item.salary,
      company: item.company.company_name,
      address: item.company.address,
      logo: item.company.logo,
      time_close: item.close_day,
      type: item.type
    }));
    setSearch(allJobs);
  };

  const handleFullStack = () => {
    const fullStackJobs = jobs
      .filter((item) => item.position == 'FullStack')
      .map((item) => ({
        position: item.position,
        salary: item.salary,
        company: item.company.company_name,
        address: item.company.address,
        logo: item.company.logo,
        time_close: item.close_day,
        type: item.type
      }));
    setSearch(fullStackJobs);
  };
  const handleDesign = () => {
    const Design = jobs
      .filter((item) => item.position == 'Design')
      .map((item) => ({
        position: item.position,
        salary: item.salary,
        company: item.company.company_name,
        address: item.company.address,
        logo: item.company.logo,
        time_close: item.close_day,
        type: item.type
      }));
    setSearch(Design);
  };
  const handleJavaDev = () => {
    const JavaDev = jobs
      .filter((item) => item.position == 'Java Dev')
      .map((item) => ({
        position: item.position,
        salary: item.salary,
        company: item.company.company_name,
        address: item.company.address,
        logo: item.company.logo,
        time_close: item.close_day,
        type: item.type
      }));
    setSearch(JavaDev);
  };
  const handleReactJSDev = () => {
    const ReactJSDev = jobs
      .filter((item) => item.position == 'ReactJS Dev')
      .map((item) => ({
        position: item.position,
        salary: item.salary,
        company: item.company.company_name,
        address: item.company.address,
        logo: item.company.logo,
        time_close: item.close_day,
        type: item.type
      }));
    setSearch(ReactJSDev);
  };
  const handleLaravelDev = () => {
    const LaravelDev = jobs
      .filter((item) => item.position == 'Laravel Dev')
      .map((item) => ({
        position: item.position,
        salary: item.salary,
        company: item.company.company_name,
        address: item.company.address,
        logo: item.company.logo,
        time_close: item.close_day,
        type: item.type
      }));
    setSearch(LaravelDev);
  };

  const handleFulltime = () => {
    const Fulltime = jobs
      .filter((item) => item.type === 'Full-time')
      .map((item) => ({
        position: item.position,
        salary: item.salary,
        company: item.company.company_name,
        address: item.company.address,
        logo: item.company.logo,
        time_close: item.close_day,
        type: item.type
      }));
    setSearch(Fulltime);
  };

  const handleParttime = () => {
    const Parttime = jobs
      .filter((item) => item.type === 'Part-time')
      .map((item) => ({
        position: item.position,
        salary: item.salary,
        company: item.company.company_name,
        address: item.company.address,
        logo: item.company.logo,
        time_close: item.close_day,
        type: item.type
      }));
    setSearch(Parttime);
  };
  const handleDaNang = () => {
    const DaNang = jobs
      .filter((item) => item.company.address === 'Đà Nẵng')
      .map((item) => ({
        position: item.position,
        salary: item.salary,
        company: item.company.company_name,
        address: item.company.address,
        logo: item.company.logo,
        time_close: item.close_day,
        type: item.type
      }));
    setSearch(DaNang);
  };
  const handleHoChiMinh = () => {
    const HoChiMinh = jobs
      .filter((item) => item.company.address === 'Hồ Chí Minh')
      .map((item) => ({
        position: item.position,
        salary: item.salary,
        company: item.company.company_name,
        address: item.company.address,
        logo: item.company.logo,
        time_close: item.close_day,
        type: item.type
      }));
    setSearch(HoChiMinh);
  };
  const handleHaNoi = () => {
    const HaNoi = jobs
      .filter((item) => item.company.address === 'Hà Nội')
      .map((item) => ({
        position: item.position,
        salary: item.salary,
        company: item.company.company_name,
        address: item.company.address,
        logo: item.company.logo,
        time_close: item.close_day,
        type: item.type
      }));
    setSearch(HaNoi);
  };
  return (
    <div className="container-search">
      <div className="row-search">
        <div className="col-sm-3-">
          <div className="card-search">
            <form>
              <div className="row">
                <h5>Tìm theo vị trí công việc</h5>
                <label>
                  <input className="checkbox" type="checkbox" value="Design" onClick={handleDesign}/>
                  <span className="text">Thiết kế</span>
                </label>
                <label>
                  <input className="checkbox" type="checkbox" value="Java Dev" onClick={handleJavaDev}/>
                  <span className="text">Java Dev</span>
                </label>
                <label>
                  <input className="checkbox" type="checkbox" value="FullStack" onClick={handleFullStack} />
                  <span className="text">FullStack</span>
                </label>
                <label>
                  <input className="checkbox" type="checkbox" value="ReactJS Dev" onClick={handleReactJSDev} />
                  <span className="text">ReactJS Dev</span>
                </label>
                <label>
                  <input className="checkbox" type="checkbox" value="Laravel Dev" onClick={handleLaravelDev}/>
                  <span className="text">Laravel Dev</span>
                </label>
              </div>
              <div className="row">
                <h5>Tìm theo loại</h5>
                <label>
                  <input className="checkbox" type="checkbox" value="Full-time"  onClick={handleFulltime}/>
                  <span className="text">Full-time</span>
                </label>
                <label>
                  <input className="checkbox" type="checkbox" value="Part-time" onClick={handleParttime}/>
                  <span className="text">Part-time</span>
                </label>
              </div>
              <div className="row">
                <h5>Tìm theo địa chỉ</h5>
                <label>
                  <input className="checkbox" type="checkbox" value="Đà Nẵng" onClick={handleDaNang}/>
                  <span className="text">Đà Nẵng</span>
                </label>
                <label>
                  <input className="checkbox" type="checkbox" value="Hồ Chí Minh" onClick={handleHoChiMinh}/>
                  <span className="text">Hồ Chí Minh</span>
                </label>
                <label>
                  <input className="checkbox" type="checkbox" value="Hà Nội" onClick={handleHaNoi}/>
                  <span className="text">Hà Nội</span>
                </label>
              </div>
            </form>
          </div>
        </div>
        <div className="col-sm-9-">
          <div className="featured_job">
            <div className="container">
              <div className="featured_job--wrapper">
                {search &&
                  search.map((item, index) => (
                    <JobItem
                      key={index}
                      position={item.position}
                      type={item.type}
                      salary={item.salary}
                      company={item.company}
                      address={item.address}
                      logo={item.logo}
                      id={item.id}
                      description={item.description}
                      time_created={item.time_created}
                      time_close={item.time_close}
                    />
                  ))}
              </div>
              <div className="load-data">
                <button className="button">Xem thêm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItemSection;
