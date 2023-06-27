import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";

import App from './App';
import { UserContextProvider } from "./userContext";

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
    <React.StrictMode>
        <UserContextProvider>
            <Router>
                <App />
            </Router>
        </UserContextProvider>
    </React.StrictMode>
);