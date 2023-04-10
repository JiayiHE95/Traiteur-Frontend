import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import NavBar from "../../components/NavBar";

const Checkout = () => {
  const cartInfo = useSelector(state => state.checkout)
  const user = useSelector(state => state.auth.user)
  const cart = useSelector(state => state.checkout.cart)
  const [isDifferentRecipient,setIsDifferentRecipient]=useState(false)
  const [firstName,setFirstName]=useState(user.firstname)
  const [lastName,setLastName]=useState(user.lastname)
  const [mail,setMail]=useState(user.mail)
  const [tel,setTel]=useState(user.telephone)
  const [adresse,setAdresse]=useState(user.adresse)
  const [cp,setCP]=useState(user.cp)
  const [city,setCity]=useState(user.city)
  const [notif, setNotif]=useState(false)
  const [date,setDate]=useState()
  const [shippingDate,setShippingDate]=useState()
  console.log("coucou",shippingDate)
  console.log(shippingDate>=date)

  useEffect(()=>{
    const today = new Date()
    const afterTomorrow = new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0]
    setDate(afterTomorrow)
  },[])

  const confirmAdresse=()=>{
    const data={
      firstName:firstName,
      lastName:lastName,
      tel:tel,
      adresse:adresse,
      cp:cp,
      city:city,
      mail:mail,
    }
    for (const key in data) {
      if(data[key]===undefined || data[key]===""){
        setNotif(true)
        return
      }
    }
    setIsDifferentRecipient(false)
  }
  const confirmCommand=()=>{

  }

  return(
  <div>
    <NavBar show={false}/>
    <div>
      <div>Livraison</div>
      {user && 
        <div>
          <div>{firstName} {lastName}</div>
          <div>{tel}</div>
          <div>{mail}</div>
          <div>{adresse}</div>
          <div>{city} {cp}</div>
          <div onClick={()=>setIsDifferentRecipient(true)}>Je souhaite livrer à une autre adresse</div>
          <div className='form-input'>
            <label>Date de livraison</label>
            <input type='date' min={date} onChange={(e)=>{setShippingDate(e.target.value)}}></input>
          </div>
        </div>
      }
      {isDifferentRecipient&&
        <div className='form'>
          <div className='form-input'>
            <label>Nom</label>
            <input type='text' onChange={(e)=>{setLastName(e.target.value)}}></input>
          </div>
          <div className='form-input'>
            <label>Prénom</label>
            <input type='text' onChange={(e)=>{setFirstName(e.target.value)}}></input>
          </div>
          <div className='form-input'>
            <label>Téléphone</label>
            <input type='text' onChange={(e)=>{setTel(e.target.value)}}></input>
          </div>
          <div className='form-input'>
            <label>Mail</label>
            <input type='email' onChange={(e)=>{setMail(e.target.value)}}></input>
          </div>
          <div className='form-input'>
            <label>Adresse</label>
            <input type='text' onChange={(e)=>{setAdresse(e.target.value)}}></input>
          </div>
          <div className='form-input'>
            <label>Code Postal</label>
            <input type='text' onChange={(e)=>{setCP(e.target.value)}}></input>
          </div>
          <div className='form-input'>
            <label>Ville</label>
            <input type='text' onChange={(e)=>{setCity(e.target.value)}}></input>
          </div>
          <div onClick={()=>confirmAdresse()}> Valider</div>
        </div>
      }

    </div>
    <div>
      <div>Résumé de la commande</div>
      {cartInfo.beforePromoPrice &&<div>Prix total :  {cartInfo.beforePromoPrice} euros</div>}
      {cartInfo.afterPromoPrice!==0 && cartInfo.discount!==0 && <div>Réduction : {cartInfo.discount} euros</div>}
      {cartInfo.discount!==0 && cartInfo.afterPromoPrice!==0 && <div>Prix après réduction : {cartInfo.afterPromoPrice} euros</div>}
    </div>

    <div>
      <div>Dans votre panier</div>
      {cart && cart.map((product,index)=>(
        <div key={index}>
          <div>{product.product.nameProduct}</div>
          <div>{product.price*product.quantity} euros </div>
          <div>Quantité : {product.quantity}</div>
        </div>
      ))}
    </div>

    <div onClick={() =>confirmCommand()}>Commander</div>
  
  </div>
 )
}

export default Checkout