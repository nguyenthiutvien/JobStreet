

import React, { Component, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import "../../_style/admin/admin.scss"
import Userad from './Useradmin';
import Menuadmin from './Menuadmin';
import Companyad from './Companyadmin';
import Inforusers from './Informationuser';
import Browse from './Browse';
function Admin() {
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

export default Admin
