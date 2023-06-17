import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AppLayout from './AppLayout';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

// components/pages
import Home from "./pages/Home/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <div>ERROR PAGE 404</div>,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
