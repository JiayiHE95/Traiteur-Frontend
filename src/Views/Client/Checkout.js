import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";
import {useNavigate, Navigate} from 'react-router-dom'
import NavBar from "../../components/NavBar";
import cartAPI from "../../api/cartAPI";
import promoAPI from "../../api/promoAPI";
import orderAPI from "../../api/orderAPI";
import {MdMail,MdPerson,MdPersonOutline, MdKey,MdPhone, MdOutlineCancel, MdLocationCity} from 'react-icons/md'
import {TbAddressBook} from 'react-icons/tb'
import {RxCodesandboxLogo} from 'react-icons/rx'
import {TbAlertCircle} from 'react-icons/tb'

const Checkout = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const user = useSelector(state => state.auth.user)
  const [cart,setCart]=useState()
  const [discount, setDiscount] = useState(0)
  const [beforePromoPrice, setBeforePromoPrice] = useState(0)
  const [afterPromoPrice, setAfterPromoPrice] = useState(0)
  const [newDeliveryAdresse,setNewDeliveryAdresse]=useState(false) 
  const [isDifferentRecipient,setIsDifferentRecipient]=useState(false)
  
  const [firstName,setFirstName]=useState(user.firstname)
  const [newfirstName,setNewFirstName]=useState(user.firstname)
  const [lastName,setLastName]=useState(user.lastname)
  const [newlastName,setNewLastName]=useState(user.lastname)
  const [mail,setMail]=useState(user.mail)
  const [newmail,setNewMail]=useState(user.mail)
  const [tel,setTel]=useState(user.telephone)
  const [newtel,setNewTel]=useState(user.telephone)
  const [adresse,setAdresse]=useState(user.adresse)
  const [newadresse,setNewAdresse]=useState(user.adresse)
  const [cp,setCP]=useState(user.cp)
  const [newcp,setNewCP]=useState(user.cp)
  const [city,setCity]=useState(user.city)
  const [newcity,setNewCity]=useState(user.city)
  const [notif, setNotif]=useState(false)
  const [dateNotif, setDateNotif]=useState(false)
  const [date,setDate]=useState()
  const [codePromo,setCodePromo]=useState()
  const [shippingDate,setShippingDate]=useState()
  const navigate=useNavigate()
  
  useEffect(()=>{
    const today = new Date()
    const afterTomorrow = new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0]
    setDate(afterTomorrow)
    let cart=JSON.parse(localStorage.getItem("cart"))?.cart
    if(cart===undefined || cart.length===0){
      navigate("/")
    }else{
      setCart(cart)
      let beforePromoPrice=parseInt(0)
      cart.forEach(product=>{
        beforePromoPrice+=product.product.price*product.quantity
      })
      setBeforePromoPrice(beforePromoPrice)
    }
      
  },[])
  
  
  console.log(cart)
  useEffect(()=>{
    let codePromo =JSON.parse(localStorage.getItem("codePromo"))
    if(codePromo?.codePromo && isLoggedIn){
      promoAPI.verifyPromo(codePromo.codePromo).then((resp) => {
        if(resp.data.percent){
          setCodePromo(resp.data.codePromo)
          setAfterPromoPrice((beforePromoPrice*resp.data.percent).toFixed(2))
          setDiscount((beforePromoPrice*(1-resp.data.percent)).toFixed(2))
        }else{
          setCodePromo()
          setAfterPromoPrice(0)
          setDiscount(0)
        }
      })
    }
  },[beforePromoPrice])

  const confirmAdresse=()=>{
    const data={
      firstName:newfirstName,
      lastName:newlastName,
      tel:newtel,
      adresse:newadresse,
      cp:newcp,
      city:newcity,
      mail:newmail,
    }
    for (const key in data) {
      if(data[key]===undefined || data[key]===""){
        setNotif(true)
        return
      }
    }
    setIsDifferentRecipient(false)
    setNewDeliveryAdresse(true)
    setNotif(false)
  }

  const confirmCommand=()=>{
    setDateNotif(false)
    if(shippingDate===undefined || shippingDate===""){
      setDateNotif(true)
      return
    }
    const data={
      cart:cart,
      idUser:user.idUser,
      firstName:newfirstName,
      lastName:newlastName,
      tel:newtel,
      adresse:newadresse,
      cp:newcp,
      city:newcity,
      mail:newmail,
      deliverydate:shippingDate,
      totalPrice:beforePromoPrice,
      discount:discount,
      paid:afterPromoPrice===0 ?beforePromoPrice:afterPromoPrice
    }

    orderAPI.createOrder(data).then((resp) => {
      console.log(resp.data)
      let data={
        userId:user.idUser,
        cart:cart,
        idOrder:resp.data.idOrder
      }
      orderAPI.addOrderDetails(data).then((resp) => {
        if (resp.data.succes){
          localStorage.removeItem("cart")
          localStorage.removeItem("codePromo")
          cartAPI.deleteCart(user.idUser).then((resp) => {
            navigate(`/confirm-order/${data.idOrder}`)
          })
        }
      })
    })
  }

  return(
    (!isLoggedIn || cart===[] || cart===null)  ? <Navigate to={'/'} />:
  
    <div className="site-container">
      <NavBar/>
      <div className="checkout-container">   
        <div className="delivery-adresse">
          <div className="title">Livraison</div>
          {user&&!isDifferentRecipient&&
            <div className="delivery-personal-infos">
              <div style={{fontWeight:"bold"}} >Informations personnelles</div>
              <div>{firstName} {lastName}</div>
              <div>{tel}</div>
              <div>{mail}</div>
              <div>{adresse}, {city}, {cp}</div>
              <div className='date-input'>
                <label>Date de livraison</label>
                <input type='date' min={date} value={shippingDate} onChange={(e)=>{e.target.value>=date ? setShippingDate(e.target.value):setShippingDate(); setDateNotif(false)}}></input>
              </div>
              {!isDifferentRecipient && 
                <div className="clickable button" onClick={()=>{setNotif(false); setIsDifferentRecipient(true); setNewDeliveryAdresse(false)}}>Livrer à une autre adresse</div>}
            </div>}
          {isDifferentRecipient&&isLoggedIn&&
            <div className='form-inputs'>
              <div className='form-input'>
                <MdPerson className='icon'></MdPerson>
              <input type='text' placeholder="Nom" value={newlastName} onChange={(e)=>{setNewLastName(e.target.value)}}></input>
              </div>
              <div className='form-input'>
                <MdPersonOutline className='icon'></MdPersonOutline>
              <input type='text' placeholder="Prénom" value={newfirstName} onChange={(e)=>{setNewFirstName(e.target.value)}}></input>
              </div>
              <div className='form-input'>
                <MdPhone className='icon'></MdPhone>
                <input type='text' placeholder="Téléphone" value={newtel} onChange={(e)=>{setNewTel(e.target.value)}}></input>
              </div>
              <div className='form-input'>
                <MdMail className='icon'></MdMail>
                <input type='email' placeholder="Mail" value={newmail} onChange={(e)=>{setNewMail(e.target.value)}}></input>
              </div>
              <div className='form-input'>
                <TbAddressBook className='icon'></TbAddressBook>
                <input type='text' placeholder="Adresse" value={newadresse} onChange={(e)=>{setNewAdresse(e.target.value)}}></input>
              </div>
              <div className='form-input'>
                <RxCodesandboxLogo className='icon'/>
                <input type='text' placeholder="Code Postale" value={newcp} onChange={(e)=>{setNewCP(e.target.value)}}></input>
              </div>
              <div className='form-input'>
                <MdLocationCity className='icon'></MdLocationCity>
                <input type='text' placeholder="Ville" value={newcity} onChange={(e)=>{setNewCity(e.target.value)}}></input>
              </div>
            </div>
            }
            {isDifferentRecipient&&isLoggedIn&& 
              <div>
                {notif&&<div className="notif-error"><TbAlertCircle className='error-icon'/><div>Veuillez remplir tous les champs</div></div>}
                <div className="clickable" onClick={()=>confirmAdresse()}> Valider</div>
                <div className="clickable" onClick={()=>setIsDifferentRecipient(false)}> Annuler</div>
              </div>}
            {newDeliveryAdresse&&
              <div>
                <div style={{fontWeight:"bold"}}>Adresse de livraison</div>
                <div>{newfirstName} {newlastName}</div>
                <div>{newtel}</div>
                <div>{newmail}</div>
                <div>{newadresse}, {newcity}, {newcp}</div>
              </div>}    
        </div>
        
        <div className="checkout-resume">
          <div className="title">Résumé de la commande</div>
          {beforePromoPrice!==0 &&<div>Prix total :  {beforePromoPrice} €</div>}
          {afterPromoPrice!==0 && discount!==0 && <div>Réduction : {discount} €</div>}
          {discount!==0 && afterPromoPrice!==0 && <div>Prix final : {afterPromoPrice} € ({codePromo})</div>}
      
          <div style={{fontWeight:"bold"}}>Dans votre panier</div>
          {cart && cart.map((product,index)=>(
            <div key={index} className="checkout-resume-product">
              <div>{product.product.nameProduct} × {product.quantity}</div>
              <div>{product.product.price*product.quantity} € </div>
            </div>
          ))}
          {dateNotif&&<div className="notif-error"><TbAlertCircle className='error-icon'/><div>Veuillez saisir la date de livraison</div></div>}
          <div className="clickable button" onClick={() =>confirmCommand()}>Commander</div>
        </div>
    </div>
  </div>
 )

}

export default Checkout