import React from 'react';
import { Link } from 'react-router-dom';

function Menuadmin({handelCompany,handelUser,handelInformation,handelbrowse}) {
  return (
    
    <div className='content-admin'>
        <div className='left-admin'>
            
           
            <img src="https://image.lag.vn/upload/news/20/11/17/latest_LHPC.jpg" alt="" /> 
           <p><b>Admin </b></p> 
        </div><br></br><br></br>
        <div className='leftadmin'>
          <ul className='left-conten'>
          <li><Link  onClick={handelbrowse}>Duyệt thông tin</Link></li><br></br>
            <li><Link onClick={handelCompany}>Công ty</Link></li><br></br>
            <li><Link onClick={handelUser}>Ứng viên</Link></li><br></br>
            <li><Link  onClick={handelInformation}>Đơn ứng tuyển</Link></li><br></br>
            
          </ul>
        </div>
    </div>

  );
}

export default Menuadmin