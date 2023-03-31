import React, { useState } from 'react'
const PasswordResetCard=({isOpen})=>{

const [mail,setMail]=useState()
const [mdp,setMdp]=useState()
const [resetPassword, setResetPassword]=useState()
return(
  <div className='form'>
    <div>Réinitialisez le mot de pass</div>
    <div onClick={()=>{isOpen(false)}}>fermer</div>
    <div className='form-input'>
    <label>Mail</label>
    <input type='text' onChange={(e)=>{setMail(e.target.value)}}></input>
   </div>
   <div className='form-input'>
    <label>Mot de pass</label>
    <input type='text' onChange={(e)=>{setMdp(e.target.value)}}></input>
   </div>
   <div className='form-input'>
    <label>Resaisissez votre mot de passe</label>
    <input type='text' onChange={(e)=>{setResetPassword(e.target.value)}}></input>
   </div>
<div></div>

  </div>
 
 )

}
export default PasswordResetCard