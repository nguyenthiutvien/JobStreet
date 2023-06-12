import { BrowserRouter, Routes, Route } from "react-router-dom";

import ReactDOM from "react-dom/client";


import Home from "./Home";

import "../src/_style/main.scss";
import  AllJobs  from "./components/pages/AllJobs";
import JobDetails from "./components/jobs/JobDetails"


  
ReactDOM.createRoot(document.getElementById("root")).render(
    
    
    <BrowserRouter>
    <Routes>
        {/* <Route > */}
       
         
          <Route path="" element={<Home />} />
          <Route path="/jobs" element={<AllJobs />} />
          <Route path="/job-details/:id" element={<JobDetails />} />


        {/* </Route> */}

    </Routes>
  </BrowserRouter>
  
   

);