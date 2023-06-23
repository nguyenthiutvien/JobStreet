import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "antd";
function Inforusers(){
    const [inforuser,setInforuser]=useState([]);
    useEffect(()=>{
        getData();
    },[]);
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
    return(
        <div className="information-content">
            <h2>Thông tin </h2>
            <Table dataSource={inforuser} columns={columns}></Table>
        </div>
    )
}
export default Inforusers