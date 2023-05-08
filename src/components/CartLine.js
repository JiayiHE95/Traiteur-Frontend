import React, { useEffect, useState } from "react"
import {MdOutlineCancel} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import productAPI from "../api/productAPI"

const CartLine = ({product,cart,setCart}) => { 
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const [price, setPrice]=useState(0)
  
  useEffect(()=>{
    isNaN(product.price)?productAPI.getProductById(product.idProduct).then((resp) => {
      setPrice(resp.data.price)
    }):setPrice(product.price)
  },[])
  
  const handleChangeQuantity=(id,q)=>{
    let cartName
    isLoggedIn? cartName='cart': cartName='visitorCart'
    cart.length!==0 && cart.forEach(product => {
      if (product.idProduct===id) { product.quantity=q }
    })
    const newCart = cart.filter(item => item.quantity > 0)
    setCart(newCart)
    newCart.length===0 ? localStorage.removeItem(cartName) : localStorage.setItem(cartName,JSON.stringify({cart:newCart}))
  }
 
  return(
   product !== undefined &&
   <div className="cart-detail">
      <div><img src={product.path}/></div>
      <div>{product.product.nameProduct}</div>
      <div>{price*product.quantity} euros </div>
      <div>Quantité :  
        <input type='number' min="0" max="100" value={product.quantity} onChange={(e)=>handleChangeQuantity(product.idProduct,e.target.value)}/>
      </div>
      <MdOutlineCancel className="icon clickable" onClick={()=>handleChangeQuantity(product.idProduct,0)}/>
   </div>
  )

}
export default CartLine