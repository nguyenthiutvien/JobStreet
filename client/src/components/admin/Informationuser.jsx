import axios from "axios";
import { useEffect, useState } from "react";
import { Table,Pagination } from "antd";
import { Link } from "react-router-dom";
function Inforusers(){
    const [inforuser,setInforuser]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 7;
    useEffect(()=>{
        getData();
    },[]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    const getData = async()=>{
        try {
            const data = await axios.get('http://127.0.0.1:8000/api/datajobs')
            setInforuser(data.data)
        } catch (error) {
            console.log(error)
        }
    }
      
      const columns = [
        {
            title: "Ứng viên",
            dataIndex: "username",
            key: "name"
        }, {
            title: "Công ty",
            dataIndex: "company_name",
            key: "company_name"
        },
        {
            title: "Vị trí",
            dataIndex: "position",
            key: "position"
        },
        {
            title: "Trạng thái ",
            dataIndex: "status",
            key: "status",
            
        }
    ]
    const paginatedData = inforuser.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
    
    return(

        <div className="information-content">
           
            <Table dataSource={paginatedData} columns={columns}></Table>
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={inforuser.length}
                onChange={handlePageChange}
            />
        </div>
    )
}
export default Inforusers