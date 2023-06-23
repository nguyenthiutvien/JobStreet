import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Userad from './Useradmin';
    function Admis() {
    return (
        <div className='content-admin'>
                <div className='admin-left'>
                    <h2>ADMIN</h2><br></br>
                    <Link to={'/comapanyad'} className='btn btnprimary'> COMPANIES</Link><br></br><br></br>
                    <Link to={'/userad'} className='btn btnprimary'> USERS</Link><br></br><br></br>
                    <Link to={'/information'} className='btn btnprimary'> InFORMATION-USER</Link>


                </div>
                <div className='admin-right'>
                        <Userad/>
                </div>
        </div>
    )
     
    
    }

    export default Admis

