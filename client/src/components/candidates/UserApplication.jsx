import { Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { getApplications } from "../../api/Api";
export const Apply = () => {
    const email = JSON.parse(localStorage.getItem("login"));
    const [apply, setAppy] = useState([])
    useEffect(() => {
        const getApply = async () => {
            const values = await getApplications(email.email);
            setAppy(values.data)
        }
        getApply();
    }, [])
    const columns = [
        {
            title: "Tên công ty",
            dataIndex: "company_name",
            key: "name"
        }, {
            title: "Vị trí ứng tuyển",
            dataIndex: "position",
            key: "position"
        },
        {
            title: "Ngày ứng tuyển",
            dataIndex: "created_at",
            key: "date"
        },
        {
            title: "Tình trạng",
            dataIndex: "status",
            key: "status"
        }
    ]
    return (
        <>
            <div className="container--table--cv">
                <div className="cv--title">
                    <p>Danh sách công ty ứng tuyển</p>
                </div>
                <div className="list--cv">
                    <Table dataSource={apply} columns={columns}>
                    </Table>
                </div>
            </div>
        </>
    )
}