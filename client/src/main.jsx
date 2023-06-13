
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./components/Blog/Blog.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
        <Routes>

            <Route path="/" element={<Blog />} />

        </Routes>
    </BrowserRouter>
    // <h1>quan</h1>


);
