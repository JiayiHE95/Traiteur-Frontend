//cmd rapide : rfce
import React, {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import ClientHome from './Views/Client/ClientHome'
import AdminHome from './Views/Admin/AdminHome'
import Home from './Views/Home'
import Product from './Views/Product'
import Cart from './Views/Cart'
import Checkout from './Views/Client/Checkout'
import ErrorPage from './Views/Error'
import PasswordResetCard from './components/PasswordResetCard'
import About from './Views/About'
import { useDispatch, useSelector } from 'react-redux'
import { verifyToken } from './redux/authReducer'
import ConfirmOrder from './Views/Client/ConfirmOrder'
import AllUsers from './Views/Admin/AllUsers'
import AllCommands from './Views/Admin/AllCommands'
import AllProducts from './Views/Admin/AllProducts'
import AllPromos from './Views/Admin/AllPromos'

const App = () =>{
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const isAdmin = useSelector(state => state.auth.isAdmin)
  const dispatch = useDispatch();

  useEffect(()=>{ 
    dispatch(verifyToken())
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home/>} />
        <Route path={'/reset-password/:token'} element={<PasswordResetCard />} />
        <Route path={'/products'} element={<Product/>} />
        <Route path={'/checkout'} element={isLoggedIn ? <Checkout /> : <Navigate to={'/'} />} />
        <Route path={'/home/user/:idUser'} element={isLoggedIn ? <ClientHome /> : <Navigate to={'/'} />} />
        <Route path={'/panier'} element={<Cart />} />
        <Route path={'/about'} element={<About />} />
        <Route path={'/confirm-order/:idOrder'} element={<ConfirmOrder />} />
        <Route path={"*"} element={<ErrorPage/>} />
        <Route path={'/home/admin'} element={isAdmin&&isLoggedIn ? <AdminHome /> : <Navigate to={'/'} />} />
        <Route path={'/home/admin/cmds'} element={isAdmin&&isLoggedIn ? <AllCommands /> : <Navigate to={'/'} />} />
        <Route path={'/home/admin/users'} element={isAdmin&&isLoggedIn ? <AllUsers /> : <Navigate to={'/'} />} />
        <Route path={'/home/admin/products'} element={isAdmin&&isLoggedIn ? <AllProducts /> : <Navigate to={'/'} />} />
        <Route path={'/home/admin/promos'} element={isAdmin&&isLoggedIn ? <AllPromos /> : <Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  )
}
  
export default App