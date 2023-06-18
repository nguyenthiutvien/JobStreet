import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

import 'antd/dist/reset.css';
import "./_styles/index.scss";
import '../src/_styles/pages/company.scss'
import '../src/_styles/pages/Detail.scss'

import { BrowserRouter } from "react-router-dom";




ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
        // <Provider store={store}>
        //     <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
        //     </PersistGate>
        // </Provider>
    // </React.StrictMode>
);
