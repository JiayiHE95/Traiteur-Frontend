import React, { useEffect } from "react"
import {MdOutlineCancel} from 'react-icons/md'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

const CartLine = ({product,cart,setCart}) => { 
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 const handleChangeQuantity=(id,q)=>{
  let cartName
  isLoggedIn? cartName='cart': cartName='visitorCart'
  cart.length!==0 && cart.forEach(product => {
    if (product.idProduct===id) { product.quantity=q }
  })
  const newCart = cart.filter(item => item.quantity > 0)
  setCart(newCart)
  newCart.length===0 ? localStorage.removeItem(cartName) :
  localStorage.setItem(cartName,JSON.stringify({cart:newCart}))
  }
 
  return(
   product !== undefined && 
   <div>
       <div><img src={product.path} style={{width: "200px", height: "200px"}}/></div>
       <div>
        <div>{product.product.nameProduct}</div>
        <div>{product.product.price*product.quantity} euros </div>
        <div>Quantité : </div>
        <input type='number' min="0" max="100" value={product.quantity} onChange={(e)=>handleChangeQuantity(product.idProduct,e.target.value)}/>
        <MdOutlineCancel onClick={()=>handleChangeQuantity(product.idProduct,0)}/>
       </div>
   </div>
  )




}
export default CartLine