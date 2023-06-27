import React from 'react';
import { Form, Input, Button } from 'antd';

const EmployerForm = ({ initialValues, onFinish }) => {
  return (
    <div className="form--company--infor">
      <Form
        initialValues={initialValues}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Tên công ty"
          name="company_name"
          rules={[{ required: true, message: "Vui lòng nhập tên công ty!" }]}
        >
          <Input />
        </Form.Item>
        {/* Các trường khác của form */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EmployerForm;
