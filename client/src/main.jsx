import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ReactDOM from "react-dom/client";


import Home from "./Home";

import "../src/_style/main.scss";
import  AllJobs  from "./components/pages/AllJobs";
import JobDetails from "./components/jobs/JobDetails"

ReactDOM.createRoot(document.getElementById("root")).render(
   
        // <Provider store={store}>
        //     <PersistGate persistor={persistor}>
        <BrowserRouter>
        <React.StrictMode>
              
                    <App />
               
        </React.StrictMode>
        </BrowserRouter>
        //     </PersistGate>
        // </Provider>
   
);


  
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
