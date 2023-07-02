import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUser, faEnvelopeOpenText, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { Table, Button } from "antd";

function Browse() {
  const [job, setJob] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  useEffect(() => {
    getData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/getstatus");
      setJob(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/deletejob/${id}`, {
      method: "DELETE",
    })
      .then((result) => {
        result.json().then((data) => {
          Swal.fire("Thành công", "Xóa sản phẩm thành công", "success");
          console.warn(data);
          getData();
        });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleUpdate = (id) => {
    fetch(`http://127.0.0.1:8000/api/selectstatus/${id}`, {
      method: "PUT",
    })
      .then((result) => {
        result.json().then((data) => {
          Swal.fire("Thành công", "Duyệt thành công", "success");
          console.warn(data);
          getData();
        });
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const columns = [
    {
      title: "Vị trí",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Công ty",
      dataIndex: "company_name",
      key: "company_name",
    },
    {
      title: "Lương",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            onClick={() => handleUpdate(record.id)}
            type="primary"
            className="mr-2"
          >
            Duyệt
          </Button>
          <Button
            onClick={() => handleDelete(record.id)}
            type="warning"
            danger
          >
            Từ chối
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div className="content-delete">
      <div className="card">
        <div className="card-user"><FontAwesomeIcon icon={faCoffee} /></div>
        <div className="card-company"><FontAwesomeIcon icon={faUser} /> </div>
        <div className="card-apply"> <FontAwesomeIcon icon={faEnvelopeOpenText} /></div>
        <div className="card-candidate"><FontAwesomeIcon icon={faClipboardList} /></div>

      </div> <br /><br />
      <div>
        <Table className="card-table"
          columns={columns}
          dataSource={job}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: job.length,
            onChange: handlePageChange,
          }}
        />
     </div>
    </div>
  );
}

export default Browse;
