import React from 'react';
import { Table } from 'antd';

const ApplicationTable = ({ applications, loading, handleStatusChange }) => {
  const columns = [
    // Các cột của bảng
  ];

  return (
    <div className="list--cv">
      <Table
        dataSource={applications}
        columns={columns}
        loading={loading}
        // Các thuộc tính và sự kiện khác của bảng
      />
    </div>
  );
};

export default ApplicationTable;
