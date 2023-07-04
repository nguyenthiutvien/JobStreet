import { Routes, Route, Outlet, Link } from "react-router-dom";
import { NotFoundPage } from "./components/Authennitication/NotFoundPage";
import { LoginUser } from "./components/Authennitication/LoginAuthennitication";
import { Register } from "./components/Authennitication/Authennitication";
import { RegisterEmployee } from "./components/Authennitication/Authennitication";

import { LoginEmployee } from "./components/Authennitication/LoginAuthennitication";
import { UserFogotPassword } from "./components/Authennitication/ForgotPassword";
import { EmployeeFogotPassword } from "./components/Authennitication/ForgotPassword";
import { UserChangePassword } from "./components/Authennitication/ChangePassword";
import { UserEnterCode } from "./components/Authennitication/EnterCodeConfirm";
import { EmployeeEnterCode } from "./components/Authennitication/EnterCodeConfirm";
import { EmployeeChangePassword } from "./components/Authennitication/ChangePassword";
import { EmployeePayment } from "./components/Authennitication/Authennitication";
import { UserProfile } from "./components/candidates/UserProfile";
import AllJobs from "./components/pages/AllJobs";
import JobDetails from "./components/jobs/JobDetails";
import Header from "./components/header/Header";
import Company from './components/company/Company'
import DetailCompany from './components/company/DetaiCompanyl'
import CompanyJob from './components/company/CompanyJob';

import JobItem from "./components/jobs/JobItem";
import  EmployerProfile  from "./components/employer/EmployerProfile";

import Blog from './components/Blog/Blog';
import Companyad from "./components/admin/Companyadmin";
import Userad from "./components/admin/Useradmin";
import Admin from "./components/admin/Admin";
import Inforusers from "./components/admin/Informationuser";
import Menuadmin from "./components/admin/Menuadmin";
import Browse from "./components/admin/Browse";
import Contact from "./components/pages/Contact"
import NavHero from "./components/pages/navigation/NavHero";
import NavBar from "./components/pages/navigation/NavBar";
import { MyInformation } from "./components/candidates/UserInfor";
import { Apply } from "./components/candidates/UserApply";
import { ChangePassword } from "./components/candidates/ChangePassUser";

import Jobs from "./components/employer/Jobs";
import CompanyChangePassword from "./components/employer/CompanyChangePassword";
import Application from "./components/employer/Application";
import { CompanyInformation } from "./components/employer/CompanyInformation";
import Map from "./components/jobs/map";




export const Router = () => [   
    {
            path:"/",element:<Header/>,
            children:[
                // {path:"",element:<Hero/>},
                {path:"",element:<AllJobs/>},
                {path:"job-details/:id",element:<JobDetails/>},
                {path:"blog",element:<Blog/>},
                {path:"company",element:<Company/>},
                {path:"contact",element:<Contact/>},
                {path:"companyJob/:id",element:<CompanyJob/>},
            ]
    },
    {path:"map" ,element:<Map/>},
    {path:"company",element:<Company/>},
    {path:"detailCompany/:id", element:<DetailCompany/>,},
    {path:"loginUser", element:<LoginUser/>},
    {path:"loginEmployee", element:<LoginEmployee/>},
    {path:"employeePayment",element:<EmployeePayment/>},
    {path:"employerProfile",element:<EmployerProfile/>,
    children:[
        {path:"",element:<CompanyInformation/>},
        {path:"jobs",element:<Jobs/>},
        {path:"changePassword",element:<CompanyChangePassword/>},
        {path:"companyApllication" ,element:<Application/>}
    ]
},


    {path:"userProfile",element:<UserProfile/>,
        children:[
            {path:"Information",element:<MyInformation/>},
            {path:"",element:<Apply/>},
            {path:"ChangePassword",element:<ChangePassword/>}
        ]},



   
    {path:"registerUser", element:<Register/>},
    {path:"userForgot", element:<UserFogotPassword/>},
    {path:"employeeForgot", element:<EmployeeFogotPassword/>},
    {path:"newpasswordUser", element:<UserChangePassword/>},
    {path:"newpasswordEmployee", element:<EmployeeChangePassword/>},
    {path:"entercodeUser", element:<UserEnterCode/>},
    {path:"entercodeEmployee", element:<EmployeeEnterCode/>},
    {path:"registerEmployee", element:<RegisterEmployee/>},
    {path:"navBar", element:<NavBar/>},
    { path: "admin", element: <Admin /> },
    { path:"/employeePayment", element :< EmployeePayment />  },
    
        // <Routes>
        //     <Route path="/userProfile" element={<UserProfile/>}></Route>
        //     <Route path="/employerProfile" element={<EmployerProfile/>}></Route>
        //     <Route path="/employeePayment" element={<EmployeePayment/>}></Route>
        //     <Route path="/entercodeEmployee" element={<EmployeeEnterCode/>}></Route>
        //     <Route path="/entercodeUser" element={<UserEnterCode/>}></Route>
        //     <Route path="/newpasswordUser" element={<UserChangePassword/>}></Route>
        //     <Route path="/newpasswordEmployee" element={<EmployeeChangePassword/>}></Route>
        //     <Route path="/employeeForgot" element={<EmployeeFogotPassword/>}></Route>
        //     <Route path="/userForgot" element={<UserFogotPassword/>}></Route>
        //     <Route path="/loginEmployee" element={<LoginEmployee/>}></Route>
        //     <Route path="/loginUser" element={<LoginUser/>}></Route>
        //     <Route path="/registerEmployee" element={<RegisterEmployee/>}></Route>
        //     <Route path="/registerUser" element={<Register/>}></Route>
        //     <Route path="/homePage" element={<HomePage/>}></Route>
        //     <Route path="" element={<Home />} />

        //   <Route path="/contact" element={<Contact/>}></Route>
        //   <Route path="/jobs" element={<AllJobs />} />
        //   <Route path="/job-details/:id" element={<JobDetails />} />


        //     {/* <Route path="/jobs" element={<AllJobs />} /> */}
        //     <Route path="/job-details/:id" element={<JobDetails />} />

        //     <Route exact path="/company"  element={<Company/>} />
        //     <Route path="/detail/:id" element={<Detail></Detail>} />
        //     <Route path="/timvieclam/:id" element={<Timvieclam></Timvieclam>} />

        //     <Route path="/blog" element={<Blog />} />

        //      <Route path="/admin/*" element={<n/>} />
        //     <Route path="/menuadmin" element={<Menuadmin/>} />
            
        //     <Route path="/companyad" element={<Companyad/>}/>
        //     <Route path="/userad" element={<Userad/>}/>
        //     <Route path="/information" element={<Inforusers/>}/>

        //     <Route path="/browse" element={<Browse/>}/>
        //     {/* <Route path="/searchjob" element={<Search/>}></Route> */}
        // </Routes>
    

]



