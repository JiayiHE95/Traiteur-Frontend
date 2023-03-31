//cmd rapide : rfce
import React, {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Client from './Views/Client/ClientInfoPage'
import Home from './Views/Client/Home'
import ErrorPage from './Views/Error'
import { useDispatch, useSelector } from 'react-redux'
import userAPI from './api/userAPI'
import { authActions } from './redux/authReducer'

const App = () =>{
  /*test */
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  console.log("là bas",isLoggedIn)
  const dispatch = useDispatch();

  useEffect(()=>{
    try{
     const auth=JSON.parse(localStorage.getItem("auth"))
     if(!auth){
      console.log("log out")
      dispatch(authActions.logout())
     }
     //console.log(auth.token)
     userAPI.check({
      headers:{"x-access-token":auth.token}
     }).then((resp) => {
       if (resp.data.auth){
        console.log("login succes")
        dispatch(authActions.loginSuccess())
      }else{
        console.log("login time out")
        dispatch(authActions.loginTimeOut())
      }
     }).catch(error => {
      console.log(error)
     })
    } catch{
  
    }
   })


  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home/>} />
      {/*
        <Route path={'/login'} element={<Login mode="login"/>} />
        <Route path={'/new-compte'} element={<Login mode="new-compte" />} />
        <Route path={'/password-reset'} element={<Login mode="password-reset" />} />
        <Route path={'/password-reset/:resetToken'} element={<Login mode="password_reset" />} 
      />*/}
        <Route path={'/home/profil/:userId'} element={isLoggedIn ? <Client /> : <Navigate to={'/login'} />} />
        <Route path={"*"} element={<ErrorPage/>} />
      </Routes>
    
    </BrowserRouter>
  )
}
  

//export default App
export default App