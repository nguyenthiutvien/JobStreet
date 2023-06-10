import { ROUTE } from "../constants/common";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginRequested } from "../_redux/actions/userActions";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const { LOGIN: isLoading } = useSelector((state) => state.loading);

    const onSubmit = (values) => {
        console.log("values", values);
        dispatch(
            loginRequested({
                username: values.username,
                password: values.password,
            })
        );
    };

    return (
        <div className="login-page">
            <h5>Đăng nhập</h5>
            <hr />
            <Form
                className="login-form"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input className="login-input" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                        {
                            min: 6,
                            message:
                                "Please input your password with length more than 6!",
                        },
                    ]}
                >
                    <Input.Password className="login-input" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" block loading={!!isLoading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <div className="login-page-footer">
                <p>
                    Chưa có tài khoản?{" "}
                    <Link to={ROUTE.REGISTER}>Nhấn vào đây</Link> để dễ dàng tạo
                    tài khoản mới.
                </p>
                <p>
                    Nếu bạn là nhà tuyển dụng, hãy{" "}
                    <Link to={ROUTE.REGISTER}>nhấn vào đây</Link>
                </p>
            </div>
        </div>
    );
};
