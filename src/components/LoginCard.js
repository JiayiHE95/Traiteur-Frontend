import React, { useEffect, useState } from 'react'
import { authActions } from '../redux/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import userAPI from '../api/userAPI'
import cartAPI from '../api/cartAPI'
import productAPI from '../api/productAPI'
import {MdMail, MdKey, MdOutlineCancel} from 'react-icons/md'
import {TbAlertCircle} from 'react-icons/tb'

const LoginCard=({isOpen, newCompte, reset})=>{
  const dispatch = useDispatch();
  const [mail,setMail]=useState()
  const [mdp,setMdp]=useState()
  const [notif,setNotif]=useState()

  useEffect(()=>{ 
    setNotif()
   },[mdp,mail])

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
      //console.log(resp.data)
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
        setNotif(resp.data.message)
      }
    }).catch(error => {
      console.log(error)
    })
  } 

 return(
  <div className='form-wrapper'>
    <div className='form-container'>
      <MdOutlineCancel className='close-icon clickable' onClick={()=>{isOpen(false)}}/>
      <div className='form-title'>Connexion</div>
      <div className='form-inputs'>
        <div className='form-input'>
          <MdMail className='icon'></MdMail>
          <input type='email' required="required" placeholder='mail' onChange={(e)=>{setMail(e.target.value)}}></input>
        </div>
        <div className='form-input'>
          <MdKey className='icon'></MdKey>
          <input type='password' required="required" placeholder='mot de passe' onChange={(e)=>{setMdp(e.target.value)}}></input>
        </div>
      </div>
      {notif && <div className='notif-error'><TbAlertCircle className='error-icon'/><div>{notif}</div></div>}
      <div className='clickable' onClick={()=>{reset(true) ;isOpen(false)}}>Mot de passe oublié</div>
      <div className='clickable' onClick={()=>{newCompte(true) ;isOpen(false)}}>Créer un compte</div>
      <div className='clickable' onClick={()=>connexion()}>Valider</div>
    </div>
  </div>
 )

}
export default LoginCard