import { Routes, Route, Outlet, Link } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";
import { LoginUser } from "./LoginAuthennitication";
import { Register } from "./Authennitication";
import { RegisterEmployee } from "./Authennitication";
import { HomePage } from "./HomePage";
import { LoginEmployee } from "./LoginAuthennitication";
import { UserFogotPassword } from "./ForgotPassword";
import { EmployeeFogotPassword } from "./ForgotPassword";
import { UserChangePassword } from "./ChangePassword";
import { UserEnterCode } from "./EnterCodeConfirm";
import { EmployeeEnterCode } from "./EnterCodeConfirm";
import { EmployeeChangePassword } from "./ChangePassword";
import { EmployeePayment } from "./Authennitication";
import { Application } from "./Application";
import AllJobs from "../components/pages/AllJobs";
import JobDetails from "../components/jobs/JobDetails";
import Home from "../Home";
export const Router = () => {
    return (
        <Routes>
            <Route path="/a" element={<Application/>}></Route>
            <Route path="/employeePayment" element={<EmployeePayment/>}></Route>
            <Route path="/entercodeEmployee" element={<EmployeeEnterCode/>}></Route>
            <Route path="/entercodeUser" element={<UserEnterCode/>}></Route>
            <Route path="/newpasswordUser" element={<UserChangePassword/>}></Route>
            <Route path="/newpasswordEmployee" element={<EmployeeChangePassword/>}></Route>
            <Route path="/employeeForgot" element={<EmployeeFogotPassword/>}></Route>
            <Route path="/userForgot" element={<UserFogotPassword/>}></Route>
            <Route path="/loginEmployee" element={<LoginEmployee/>}></Route>
            <Route path="/loginUser" element={<LoginUser/>}></Route>
            <Route path="/registerEmployee" element={<RegisterEmployee/>}></Route>
            <Route path="/registerUser" element={<Register/>}></Route>
            <Route path="/homePage" element={<HomePage/>}></Route>
            <Route path="" element={<Home />} />
          <Route path="/jobs" element={<AllJobs />} />
          <Route path="/job-details/:id" element={<JobDetails />} />



        </Routes>
    );
};

