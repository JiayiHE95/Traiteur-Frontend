import React, { useEffect } from "react"
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from "../components/NavBar";
import CartLine from "../components/CartLine";
import promoAPI from "../api/promoAPI";
import {MdOutlineCancel} from 'react-icons/md'
import productAPI from "../api/productAPI";
import { checkoutActions } from "../redux/checkoutReducer";

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
 const dispatch = useDispatch();
 
 useEffect(()=>{ 
  let cartName
  isLoggedIn? cartName='cart': cartName='visitorCart'
  let cart =JSON.parse(localStorage.getItem(cartName))
  if (cart.cart) {
  setCart(cart.cart)
  cart.cart.forEach(product=>{
    productAPI.getProductById(product.idProduct).then((resp) => {
      product.price=resp.data.price
    })
  })
  }
 },[isLoggedIn])

 useEffect(()=>{
  let beforePromoPrice=0
  cart && cart.forEach(product=>{
    beforePromoPrice+=product.price*product.quantity
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
    dispatch(checkoutActions.addCart({
      beforePromoPrice:beforePromoPrice,
      codePromo:promo,
      discount:discount,
      afterPromoPrice:afterPromoPrice,
      cart:cart,
    }))
    navigate('/checkout')
 }

 return(
<div>
  <NavBar show={false}/>
  <div onClick={() => navigate("/products")}>Retour</div>
  {cart=== undefined ? 
    <div>votre panier est vide</div>
    :
    <div>
     {cart.map((product) => (
      <div key={product.idProduct}>
        <CartLine
        product={product}
        setCart={setCart}
        cart={cart}/>
      </div>
     ))}
     <div>

      {isLoggedIn ?
      (beforePromoPrice === 0 ? <div>Votre Panier est vide</div>
      :<div>
        <div>Résumé de la commande</div>
        {beforePromoPrice &&<div>Prix total :  {beforePromoPrice} euros</div>}
        {afterPromoPrice!==0 && discount!==0 && <div>Réduction : {discount} euros</div>}
        {discount!==0 && afterPromoPrice!==0 && <div>Prix après réduction : {afterPromoPrice} euros</div>}
        <div>Code promo</div>
        <div>
          <input type="text" onChange={(e)=>{setPromo(e.target.value)}}></input>
          {promoSuccesNotif && <div> {promo} <MdOutlineCancel onClick={()=>{setDiscount(0);setpromoSuccesNotif(false);setAfterPromoPrice(0)}}/></div>}
          {promoFailedNotif &&  <div>Code promo "{promo}" n'existe pas</div> }
          <div onClick={()=>verifyPromo()}>Appliquer</div>
        </div>
        <div onClick={() =>checkout()}>Commander</div>
      </div>)
      :
      <div>Connectez-vous pour commander</div>
      }
    </div>
    </div>
  }
</div>

 )
}


export default Cart