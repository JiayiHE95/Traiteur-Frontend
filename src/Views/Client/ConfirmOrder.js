import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import {useParams,useNavigate, Navigate} from 'react-router-dom'
import orderAPI from "../../api/orderAPI"
import NavBar from "../../components/NavBar"

const ConfirmOrder = () => {
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 const user = useSelector(state => state.auth.user)
 const navigate=useNavigate()
 const {idOrder}=useParams() 

 useEffect(()=>{
  orderAPI.getUserByOrder(idOrder).then((resp) => {
    if(resp.data.idUser!==user.idUser){
      navigate(`/`)
    }
  })
},[])

 return(
  !isLoggedIn ?
    <Navigate to={'/'} />
    :
    <div className="site-container">
    <NavBar/>
    <div className="order-succes">
      <div className="background-transparent">
      <div>Merci pour votre commande No.{idOrder}</div>
      <div className="clickable" onClick={()=>{navigate(`/home/user/${user.idUser}`)}}>Voir les détails de votre commande</div>
      <div className="clickable" onClick={()=>{navigate("/")}}>Retourner à l'accueil</div>
      </div>
    
    </div>
    </div>
 )
}

export default ConfirmOrder