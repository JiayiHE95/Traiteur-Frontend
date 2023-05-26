import React, { useState,useEffect } from 'react'
import Select from 'react-select'
import orderAPI from '../api/orderAPI'
import {AiOutlineDownCircle} from 'react-icons/ai'
import {AiOutlineUpCircle} from 'react-icons/ai'


const OrderCard=({order, isAdmin=false, pageAdmin=false})=>{
 const [deliverydate,setDeliveryDate]=useState()
 const [orderStatus,setOrderStatus]=useState(order.orderstatus)
 const [showDetails,setShowDetails]=useState(false)
 const [isModified,setIsModified]=useState(false)
 useEffect(()=>{
  if(order){
   const date=order.deliverydate.split('T')[0]
   setDeliveryDate(date)
  }
 },[])

 useEffect(()=>{
  if(orderStatus && orderStatus!==order.orderstatus){
   const data={
    idOrder:order.idOrder,
    orderStatus:orderStatus
   }
   orderAPI.changeStatus(data).then((resp)=>{
    if(resp.data.modify){
      setIsModified(true)
    }
   }
   )
  }
 },[orderStatus])

 const options=[
  { value: 'LIVREE', label: 'Livrée' },
  { value: 'CREEE', label: 'Créée' },
  { value: 'EN PREPARATION', label: 'En Préparation' }
]

 return(
  order&&
  <div className='order-card'>
   <div><b>Commande No. {order.idOrder}</b></div>
   {!pageAdmin&&<div>Status : <b>{order.orderstatus} </b></div>}
   {isAdmin&&
   <div>
     <Select
      isMulti={false}
      name={"OrderStatus"}
      defaultValue={options.find((opt) => opt.value === orderStatus)}
      placeholder={"OrderStatus"}
      options={options}
      onChange={(option) => { setOrderStatus(option.value) }}
      classNamePrefix="Status-select"
    />
    {isModified && <div>Statut modifié</div>}
   </div>
   }
   
   <div>
   <div>Prix total : {order.totalprice} euros </div>
   {order.paid !== order.totalprice && <div> Prix après réduction: {order.paid} euros</div>}
   </div>
    <div>
    <div>Date de commande : {order.createdAt.split('T')[0]}</div>
    </div>
    {!showDetails ? 
    <div className='order-card-detail-down'><AiOutlineDownCircle className="clickable icon" onClick={()=>{setShowDetails(true)}}/> <div className="clickable" onClick={()=>{setShowDetails(true)}}>Plus de détails</div></div>
    :
    <div className='order-card-detail-up'>
      <AiOutlineUpCircle className="clickable icon" onClick={()=>{setShowDetails(false)}}></AiOutlineUpCircle>
      <div>Date de livraison : {deliverydate}</div>
      <div>Destinataire : {order.lastname} {order.firstname}</div>
      <div>{order.telephone}</div>
      <div>{order.mail}</div>
      <div>{order.adresse}, {order.city}, {order.cp}</div>
      {order.orderdetails.map((detail)=>
      <div key={detail.idProduct}>
      <div>{detail.product.nameProduct} : {detail.quantity}</div>
      </div>)}
    </div>
    }
  </div>
 )

}
export default OrderCard