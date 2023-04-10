import React, { useState } from 'react'
import { authActions } from '../redux/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import userAPI from '../api/userAPI'
import cartAPI from '../api/cartAPI'
import productAPI from '../api/productAPI'

const LoginCard=({isOpen, reset})=>{
  const dispatch = useDispatch();
  const [mail,setMail]=useState()
  const [mdp,setMdp]=useState()
  const [notif,setNotif]=useState()
  
  const mergeCart=(idUser)=>{
    let visitorCart = JSON.parse(localStorage.getItem('visitorCart'))
    if (visitorCart) {
      localStorage.setItem("cart",JSON.stringify({cart:visitorCart.cart}))
      localStorage.removeItem('visitorCart')
    }else{
      cartAPI.getCart(idUser).then((resp) => {
        if (resp.data.length !==0 ){
          const promises = resp.data.map((product) => {
            return productAPI.getProductById(product.idProduct).then((resp) => {
              let imagePath = window.location.origin+"/product_picture/";
              const newCartLine={
                idProduct:product.idProduct, 
                quantity:product.quantity, 
                path:imagePath+=resp.data.pictures[0].namePicture, 
                product:resp.data }
                return newCartLine
              })
            })
          Promise.all(promises).then((newCartLine)=>{
            newCartLine?.length !==0 && localStorage.setItem("cart",JSON.stringify({cart:newCartLine}))
          }
          )
        }
      })
    }
  }

  const connexion=()=>{
    const data={
      mail:mail,
      mdp:mdp
    }
    userAPI.connexion(data).then((resp) => {
      console.log(resp.data)
      if(resp.data.auth){
        mergeCart(resp.data.user.idUser)
        localStorage.setItem("auth",JSON.stringify({
         token: resp.data.token,
         user:resp.data.user
        }))
        dispatch(authActions.loginSuccess())
        isOpen(false)
        window.location.reload()
      } else{
        //dispatch(authActions.logout())
        setNotif(resp.data.message)
      }
    }).catch(error => {
      console.log(error)
    })
  } 

 return(
  <div className='form'>
    <div>Connectez à votre compte</div>
    <div onClick={()=>{isOpen(false)}}>fermer</div>
    <div className='form-input'>
      <label>Mail</label>
      <input type='email' required="required" onChange={(e)=>{setMail(e.target.value)}}></input>
    </div>
    <div className='form-input'>
      <label>Mot de pass</label>
      <input type='password' required="required" onChange={(e)=>{setMdp(e.target.value)}}></input>
    </div>
    <div onClick={()=>{reset(true) ;isOpen(false)}}>Mot de pass oublié</div>
    {notif && <div>{notif}</div>}
    <div onClick={()=>connexion()}>valide</div>
  </div>
 )

}
export default LoginCard