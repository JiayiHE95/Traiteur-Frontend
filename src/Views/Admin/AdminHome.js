import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import {useParams,useNavigate, Navigate} from 'react-router-dom'
import orderAPI from "../../api/orderAPI"
import OrderCard from "../../components/OrderCard"
import NavBar from "../../components/NavBar"

const AdminHome = () => {
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 const isAdmin = useSelector(state => state.auth.isAdmin)
 const [orders,setOrders]=useState()
 const [filter,setFilter]=useState()
 const [closefilter,setCloseFilter]=useState(false)
 const navigate=useNavigate()

 console.log(orders)
 useEffect(()=>{
  orderAPI.getAllOrders().then((resp) => {
   console.log(resp.data)
    setOrders(resp.data)
  })
 },[closefilter])

 useEffect(()=>{
  if (filter){
   if (filter.value.includes("-")){
    filter.value=filter.value.split(" ")[0]+" 00:00:00"
    console.log(filter)
   }
   orderAPI.getAllOrdersByFilter(filter.param, filter.value).then((resp) => {
   console.log(resp.data)
   setOrders(resp.data)
  })
  } 
},[filter])

 return(
  isLoggedIn&&isAdmin?
  <div className="site-container">
    <NavBar></NavBar>
    <div className="admin-home background-transparent">
      <div>Système de gestion</div>
      <div className="button clickable" onClick={()=>navigate("/home/admin/cmds")}>Gestion commandes</div>
      <div className="button clickable" onClick={()=>navigate("/home/admin/users")}>Gestion clients</div>
      <div className="button clickable" onClick={()=>navigate("/home/admin/products")}>Gestion produits</div>
      <div className="button clickable" onClick={()=>navigate("/home/admin/promos")}>Gestion codes promo</div>
    </div>
  </div>
  :
  <Navigate to={'/'} />
)
}

export default AdminHome