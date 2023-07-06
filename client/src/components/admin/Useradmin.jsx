import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Table, Pagination } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUser, faEnvelopeOpenText, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
function Userad(){
    const [users, setUsers] = useState([]);
    const [endUser, setEndUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 7;
    useEffect(()=>{
        getData();
        getEndUser()
    },[]);
     const handlePageChange = (page) => {
    setCurrentPage(page);
    };
    const getData = async () => {
        try {
            const data = await axios.get('http://127.0.0.1:8000/api/get-candidates')
            setUsers(data.data)
        } catch (error) {
            console.log(error)
        }
    };
    const getEndUser = async () => {
        const data = await axios.get("http://127.0.0.1:8000/api/countenduser");
        setEndUser(data.data)
    }

   
      const getImageUrl = (fileName) => {
        const baseUrl = 'http://127.0.0.1:8000/storage/'; // Thay đổi đường dẫn cơ sở theo địa chỉ thư mục chứa ảnh của bạn
        return `${baseUrl}${fileName}`;
      };
      
      const columns = [
        {
            title: "Ứng viên",
            dataIndex: "username",
            key: "name"
        }, {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address"
        },
        {
            title: "Ảnh ",
            dataIndex: "avatar",
            key: "avatar",
            render: (avatar) => <img src={getImageUrl(avatar)} alt="" style={{ width: '40px', height: '40px',borderRadius:"50px" }} />,
        }
    ]
     const paginatedData = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
    return (
        <div  className="table-container">
         
            <div>
                <Table className="card-table" dataSource={paginatedData} columns={columns}></Table>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={users.length}
                    onChange={handlePageChange}
                />
            </div>
        </div>
      );
}
export default Userad