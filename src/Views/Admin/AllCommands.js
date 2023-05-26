import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import {useParams,useNavigate, Navigate} from 'react-router-dom'
import orderAPI from "../../api/orderAPI"
import OrderCard from "../../components/OrderCard"

const AllCommands = () => {
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 const isAdmin = useSelector(state => state.auth.isAdmin)
 const [orders,setOrders]=useState()
 const [filter,setFilter]=useState()
 const [closefilter,setCloseFilter]=useState(false)
 const navigate=useNavigate()

 useEffect(()=>{
  orderAPI.getAllOrders().then((resp) => {
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
   setOrders(resp.data)
  })
  } 
},[filter])

 return(
  isLoggedIn&&isAdmin?
  <div className="admin-container">
    <div className="admin-category-title">
      <div>Gestion des commandes</div>
      <div className="clickable" onClick={()=>{navigate("/home/admin")}}>Retour</div>
    </div>
    <div className="admin-filtre">
      <div className="clickable button" onClick={()=>{setCloseFilter(true)}}> All </div>
      <div className="clickable button" onClick={()=>{setFilter({param:"orderstatus",value:"CREEE"})}}> New </div>
      <div className="clickable button" onClick={()=>{setFilter({param:"orderstatus",value:"EN PREPARATION"})}}> En préparation </div>
      <div className="clickable button" onClick={()=>{setFilter({param:"orderstatus",value:"LIVREE"})}}> Livrée </div>
    </div>
    <div className="archive-container">
      {orders && orders.length!==0 ?orders.map((order)=>
      <div className="archive-order" key={order.idOrder}>
        <OrderCard order={order} isAdmin={true}/>
      </div>
      )
      :
      <div className="background-transparent">Aucune commande trouvée</div>
      }
    </div>
  </div>
  :
  <Navigate to={'/'} />
 )
}

export default AllCommands