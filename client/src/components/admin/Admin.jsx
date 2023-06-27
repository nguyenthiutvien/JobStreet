

import React, { Component, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Userad from './Useradmin';
import Menuadmin from './Menuadmin';
import Companyad from './Companyadmin';
import Inforusers from './Informationuser';
import Browse from './Browse';
function Admis() {
        const [changePageAdmin,setChangePageAdmin]=useState(<Companyad/>)
        const handelCompany=()=>{
                setChangePageAdmin(<Companyad/>)
        }
        const handelUser=()=>{
                setChangePageAdmin(<Userad/>)
        }
        const handelInformation=()=>{
                setChangePageAdmin(<Inforusers/>)
        }
        const handelbrowse=()=>{
                setChangePageAdmin(<Browse/>)
        }
        return (
                <div className='content-admins'>
                        <div className='admin-left'>
                                <Menuadmin handelCompany={handelCompany} handelUser={handelUser} handelInformation={handelInformation} handelbrowse={handelbrowse}></Menuadmin>
                        </div>
                        <div className='admin-right'>
                               {changePageAdmin}
                        </div>
                </div>
        )


}

export default Admis

{/* <Routes>
                <Route path="/companyad" element={<Companyad/>}/>
                <Route path="/userad" element={<Userad/>}/>
                 <Route path="/information" element={<Inforusers/>}/>
                 </Routes> */}