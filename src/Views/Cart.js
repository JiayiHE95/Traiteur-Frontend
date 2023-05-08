import React, { useEffect } from "react"
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from "../components/NavBar";
import CartLine from "../components/CartLine";
import promoAPI from "../api/promoAPI";
import {MdOutlineCancel} from 'react-icons/md'
import productAPI from "../api/productAPI";
import {TbAlertCircle} from 'react-icons/tb'

const Cart = () => { 
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 const [cart, setCart] = useState()
 const [promo, setPromo] = useState()
 const [promoSuccesNotif, setpromoSuccesNotif] = useState(false)
 const [promoFailedNotif, setpromoFailedNotif] = useState(false)
 const [discount, setDiscount] = useState(0)
 const [beforePromoPrice, setBeforePromoPrice] = useState(0)
 const [afterPromoPrice, setAfterPromoPrice] = useState(0)
 const navigate=useNavigate()
 
 useEffect(()=>{ 
  let cartName
  isLoggedIn? cartName='cart': cartName='visitorCart'
  let cart =JSON.parse(localStorage.getItem(cartName))
  if (cart?.cart) {
    cart.cart.forEach(product=>{
      productAPI.getProductById(product.idProduct).then((resp) => {
        product.price=resp.data.price
      })
    })
    setCart(cart.cart)
  }
 },[isLoggedIn])

 useEffect(()=>{
  let beforePromoPrice=0
  cart && cart.forEach(product=>{
    const price = parseFloat(product.price)
    if (!isNaN(price)) {
      beforePromoPrice += price * product.quantity
    }else{
      beforePromoPrice += product.product.price * product.quantity
    }
  })
  setBeforePromoPrice(beforePromoPrice)
 }
 ,[cart])

 useEffect(()=>{
  setpromoFailedNotif(false)
  setpromoSuccesNotif(false)
 }
 ,[promo])

 const verifyPromo=()=>{
  if(promo){
    promoAPI.verifyPromo(promo).then((resp) => {
      if(resp.data.percent){
        const percent=resp.data.percent
        setpromoSuccesNotif(true)
        setAfterPromoPrice((beforePromoPrice*percent).toFixed(2))
        setDiscount((beforePromoPrice*(1-percent)).toFixed(2))
      }else{
        setDiscount(0)
        setAfterPromoPrice(0)
        setpromoFailedNotif(true)
      }
    })
  }
 }

 const checkout =()=>{
  localStorage.setItem("codePromo",JSON.stringify({codePromo:promo}))
  navigate('/checkout')
 }

 return(
<div className="site-container">
  <NavBar/>
  <div className="cart-container">
    {cart=== undefined ? 
      <div className="cart-order-container background-transparent">Votre panier est vide</div>
      :
      <div className="cart-line-container">
      {cart.map((product) => (
        <div key={product.idProduct} className="cart">
          <CartLine
          product={product}
          setCart={setCart}
          cart={cart}/>
        </div>
      ))}
      </div>
    }
    {isLoggedIn ?
    (beforePromoPrice !== 0 &&
      <div className="cart-order-container">
        <div className="cart-resume">
          <div className="cart-resume-title">Résumé de la commande</div>
          {beforePromoPrice!==0 &&<div>Prix total :  {beforePromoPrice} euros</div>}
          {afterPromoPrice!==0 && discount!==0 && <div>Réduction : {discount} euros</div>}
          {discount!==0 && afterPromoPrice!==0 && <div>Prix après réduction : {afterPromoPrice} euros</div>}
          <div className="promocode">
            <input type="text" placeholder="code promo" onChange={(e)=>{setPromo(e.target.value)}}></input>
            <div className='clickable button' onClick={()=>verifyPromo()}>Valider</div>
          </div>
          {promoSuccesNotif && <div className="promocode-show"> <div>{promo}</div> <MdOutlineCancel className="clickable icon" onClick={()=>{setDiscount(0);setpromoSuccesNotif(false);setAfterPromoPrice(0)}}/></div>}
          {promoFailedNotif &&  <div className="notif-error"><TbAlertCircle className='error-icon'/> <div>Code promo "{promo}" n'existe pas</div></div> }
          <div className="clickable button" onClick={() =>checkout()}>Commander</div>
        </div>
      </div>
    )
    :
    <div className="cart-order-container background-transparent">Connectez-vous pour commander</div>
    }
  </div>
</div>

 )
}


export default Cart