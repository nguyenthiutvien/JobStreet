import { Routes, Route, Outlet, Link } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";
import { HomePage } from "./HomePage";
import { ROUTE } from "../constants/common";
import { AboutPage } from "./AboutPage";
import { LoginPage } from "./LoginPage";
import { useSelector } from "react-redux";

export const Router = () => {
    return (
        <Routes>
            <Route path={ROUTE.HOME} element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path={ROUTE.ABOUT} element={<AboutPage />} />
                <Route path={ROUTE.LOGIN} element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

const Layout = () => {
    // const { userInfo } = useSelector((state) => state.user);
    const userInfo = {
        username: 'Cuong'
    }
    return (
        <div className="container">
            <header className="header">
                <img src="/assets/images/logo.png" alt="Logo" />
                <nav className="header-nav">
                    <ul className="menu-left">
                        <li className="menu-item">
                            <Link to={"#"}>Tìm việc làm</Link>
                        </li>
                        <li className="menu-item">
                            <Link to={"#"}>Tìm thực tập</Link>
                        </li>
                        <li className="menu-item active">
                            <Link to={"#"}>Danh sách công ty</Link>
                        </li>
                        <li className="menu-item">
                            <Link to={"#"}>Bài đăng</Link>
                        </li>
                        <li className="menu-item">
                            <Link to={"#"}>Liên hệ</Link>
                        </li>
                    </ul>
                    <ul className="menu-right">
                        {!!userInfo ? (
                            <li className="menu-item">
                                HI @{userInfo?.username}
                            </li>
                        ) : (
                            <>
                                <li className="menu-item">
                                    <Link to={ROUTE.REGISTER}>Đăng kí</Link>
                                </li>
                                <li className="menu-item">
                                    <Link to={ROUTE.LOGIN}>Đăng nhập</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>footer</footer>
        </div>
    );
};
