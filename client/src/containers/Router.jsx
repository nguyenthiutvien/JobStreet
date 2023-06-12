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
export const Router = () => {
    return (
        <Routes>
            <Route path="/employeePayment" element={<EmployeePayment/>}></Route>
            <Route path="/entercodeEmployee" element={<EmployeeEnterCode/>}></Route>
            <Route path="/entercodeUser" element={<UserEnterCode/>}></Route>
            <Route path="/newpasswordUser" element={<UserChangePassword/>}></Route>
            <Route path="/newpasswordEmployee" element={<EmployeeChangePassword/>}></Route>
            <Route path="/employeeForgot" element={<EmployeeFogotPassword/>}></Route>
            <Route path="/userForgot" element={<UserFogotPassword/>}></Route>
            <Route path="/loginEmployee" element={<LoginEmployee/>}></Route>
            <Route path="/" element={<LoginUser/>}></Route>
            <Route path="/registerEmployee" element={<RegisterEmployee/>}></Route>
            <Route path="/registerUser" element={<Register/>}></Route>
            <Route path="/homePage" element={<HomePage/>}></Route>
        </Routes>
    );
};

