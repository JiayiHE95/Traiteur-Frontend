import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import {useParams,useNavigate, Navigate} from 'react-router-dom'
import orderAPI from "../../api/orderAPI"
import PersonalData from "../../components/PersonalData"
import OrderCard from "../../components/OrderCard"
import NavBar from "../../components/NavBar"

const ClientHome = () => {
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 const user = useSelector(state => state.auth.user)
 const {idUser}=useParams() 
 const [orders,setOrders]=useState()

 useEffect(()=>{
  orderAPI.getOrders(user.idUser).then((resp) => {
    setOrders(resp.data)
  })
},[])

 return(
  !isLoggedIn||user.idUser!== parseInt(idUser)?
  <Navigate to={'/'} />:
  <div className="site-container">
    <NavBar/>
    <div className="client-home">
      <PersonalData/>
      <div className="order-cards-container">  
        <div className="text-bold">Mes Commandes</div>
        <div className="order-cards">
          {orders&&orders.map((order)=>
          <div key={order.idOrder}>
            <OrderCard order={order}/>
          </div>
          )}
        </div>
      </div>
   </div>
  </div>
 )
}

export default ClientHome