import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productAPI from '../api/productAPI';

const ProductCard=({product})=>{
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 let imagePath = window.location.origin+"/product_picture/";
 const [pictures, setPictures] = useState()
 const [path,setPath]=useState()

 useEffect(()=>{ 
  product&&
   productAPI.getPicturesByProduct(product.idProduct).then((resp) => {
    setPictures(resp.data)
  }).catch(error => {
    console.log(error)
  })
 },[])

 useEffect(()=>{ 
  if (pictures!==undefined){
   imagePath+=pictures[0].namePicture
   setPath(imagePath)
  }
 },[pictures])

 const handleChangeQuantity=(q)=>{
  const id=product.idProduct
  let cartName
  isLoggedIn? cartName='cart': cartName='visitorCart'
  let cart =JSON.parse(localStorage.getItem(cartName))

  if (!cart) {
    cart = [{idProduct:id, quantity:q, path:imagePath, product:product }]
  } else {
    let exist=false
    cart=cart.cart
    cart.length!==0 && cart.forEach(element => {
      if (element.idProduct===id){
        element.quantity=q
        exist=true
      }
    })
    if(!exist){
      cart=[...cart,{idProduct:id, quantity:q, path:imagePath, product:product }]
    }
  }   
  cart = cart.filter(item => item.quantity > 0)
  cart.length===0 ? localStorage.removeItem(cartName):   
  localStorage.setItem(cartName,JSON.stringify({cart}))
  }
 

 return(
  path!==undefined&&
  <div className='product-detail'>
   <img src={path}/>
   <div>{product.nameProduct}</div>
   <div>{product.category}</div>
   <div>{product.price} euros</div>
   <input type='number' min="0" max="100" onChange={(e)=>handleChangeQuantity(e.target.value)}/>
  </div>
 ) 

}
export default ProductCard