//cmd rapide : rfce
import React, {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import ClientHome from './Views/Client/ClientHome'
import AdminHome from './Views/Admin/AdminHome'
import Home from './Views/Home'
import Product from './Views/Product'
import Cart from './Views/Client/Cart'
import ErrorPage from './Views/Error'
import { useDispatch, useSelector } from 'react-redux'
import { verifyToken } from './redux/authReducer'

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
        <Route path={'/products'} element={<Product/>} />
        <Route path={'/home/:idUser'} element={isLoggedIn ? <ClientHome /> : <Navigate to={'/'} />} />
        <Route path={'/panier/:idUser'} element={isLoggedIn ? <Cart /> : <Navigate to={'/'} />} />
        <Route path={'/admin'} element={isAdmin ? <AdminHome/> : <Navigate to={'/'} />} />
        <Route path={"*"} element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  )
}
  
export default App