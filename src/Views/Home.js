import React, { useEffect } from "react"
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from "../redux/authReducer"
import { verifyToken } from "../redux/authReducer";
import NavBar from "../components/NavBar";

const Home = () => {
 const navigate=useNavigate()

 return(
  <div>
   <NavBar/>
   <div>une image</div>
   <div onClick={()=>{navigate("/products")}}>découvrir nos plats</div>
  </div>
 )
}

export default Home