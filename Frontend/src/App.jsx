// import { useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootLayout from './pages/RootLayout'

import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import HomePage from './pages/HomePage'
import { Provider } from 'react-redux'
import store from './store'


import Protected from './pages/ProtectedRoutes'
import NewModelPage from './pages/AdminPage'
import CartPage from './pages/CartPage'
import OrdersPage from './pages/OrdersPage'
import { loader as orderLoader } from './pages/OrdersPage'
import AdminLoginPage from './pages/AdminLogin'
import AdminPage from './pages/AdminPage'
import AdminOrdersPage from './pages/AdminOrdersPage'


function App() {
  
  const router = createBrowserRouter([
    {path: '', element: <RootLayout/>, 
    children:[
      {index: true, element:  <HomePage/>},
      {path: '/login', element: <LoginPage/>},
      {path: '/signup', element: <SignupPage/>},
      {path: '/mycart', element: <Protected><CartPage/></Protected>},
      {path: '/orders', element: <Protected><OrdersPage/></Protected>, loader: orderLoader},
      {path:'/admin', element: <RootLayout/>,
      children:[
        {path: 'newproduct', element: <AdminPage/>},
        {path: 'login', element: <AdminLoginPage/>},
        {path: 'getorders', element: <AdminOrdersPage/>}
      ]}
      // {path: '*', element: <NotFoundPage/>}
    ]}
  ])
  
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  )
}

export default App
