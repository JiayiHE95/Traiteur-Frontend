import React, { useState,useEffect } from 'react'
import orderAPI from '../api/orderAPI'
import {AiOutlineDownCircle} from 'react-icons/ai'
import {AiOutlineUpCircle} from 'react-icons/ai'

const ArchiveUser=({user})=>{
 const [showDetails,setShowDetails]=useState(false)
 const [orders,setOrders]=useState()

 useEffect(()=>{
  orderAPI.getOrders(user.idUser).then((resp) => {
    setOrders(resp.data)
  })
 },[])

 return (user&&
 <div className='order-card'>
  <div><b>Client No. {user.idUser}</b></div>
  <div>{user.firstname} {user.lastname}</div>
  <div>{user.telephone}</div>
  <div>{user.mail}</div>
  <div>{user.adresse}, {user.cp}, {user.city}</div>
  {!showDetails ? 
    <div className='order-card-detail-down'>
      <AiOutlineDownCircle className="clickable icon" onClick={()=>{setShowDetails(true)}}/> 
      <div className="clickable" onClick={()=>{setShowDetails(true)}}>Commandes</div>
    </div>
    :
    <div className='order-card-detail-up'>
      <AiOutlineUpCircle className="clickable icon" onClick={()=>{setShowDetails(false)}}></AiOutlineUpCircle>
      {orders && orders.length!==0 ?orders.map((order)=>
      <div className="archive-order" key={order.idOrder}>
        <div><b>Commande No. {order.idOrder}</b></div>
      </div>
      )
      :
      <div>Aucune commande trouvée</div>
      }
    </div>
  }
 </div>
)

}

export default ArchiveUser
