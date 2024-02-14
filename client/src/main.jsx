import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import './index.css'

// Uncomment imports as they are implemented

import Login from './pages/Login'
import Home from './pages/Home'
import Store from './pages/Store'
import Signup from './pages/Signup'
import AddProduct from './pages/AddProduct'
import Product from './pages/Product'
import Orders from './pages/Orders'
import About from './pages/About'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/Login',
        element: <Login />
      },
      {
        path: '/Store',
        element: <Store />
      },
      {
        path: '/Signup',
        element: <Signup />
      },
      {
        path: '/AddProduct',
        element: <AddProduct />
      },
      {
        path: '/Product/:productId',
        element: <Product />
      },
      {
        path: '/Orders',
        element: <Orders />
      },
      {
        path: '/About',
        element: <About />
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
