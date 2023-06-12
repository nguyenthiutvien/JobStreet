import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
   
        // <Provider store={store}>
        //     <PersistGate persistor={persistor}>
        <BrowserRouter>
        <React.StrictMode>
              
                    <App />
               
        </React.StrictMode>
        </BrowserRouter>
        //     </PersistGate>
        // </Provider>
   
);
