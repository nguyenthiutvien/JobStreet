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
            <ul>
            Vị trí
              <li><input type="radio" name="a" id="a" /> Laravel</li>
              <li><input type="radio" name="a" id="" /> FullStack</li>
              <li><input type="radio" name="a" id="" /> ReactJS</li>
              <li><input type="radio" name="a" id="" /> Design</li>
            </ul>
           
            <ul>
            Địa chỉ
              <li><input type="radio" name="a" id="" /> Hà Nội </li>
              <li><input type="radio" name="a" id="" /> Hồ Chí Minh</li>
              <li><input type="radio" name="a" id="" /> Đà Nẵng</li>
              <li><input type="radio" name="a" id="" /> Quy Nhơn</li>
            </ul>
          
            <ul>
            Thời gian
              <li><input type="radio" name="a" id="" /> Full-Time</li>
              <li><input type="radio" name="a" id="" /> Part-Time</li>
            </ul>
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