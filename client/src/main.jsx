import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import './index.css'

/*
Uncomment imports as they are implemented

import Login from './components/pages/Login'
import Home from './components/pages/Home'
import Store from './components/pages/Store'
import Signup from './components/pages/Signup'
import AddProduct from './components/pages/AddProduct'

*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      /*
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/Login',
        element: <Login/>
      },
      {
        path: '/Store',
        element: <Store/>
      },
            {
        path: '/Login',
        element: <Login/>
      },
      */
    ]
  }
  ]);
  

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
