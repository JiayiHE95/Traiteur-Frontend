import React, { useState } from 'react'
import userAPI from '../api/userAPI'

const NewCompteCard=({isOpen})=>{

const addUser=()=>{
  resetPassword!==mdp? setPasswordNotif(true) : setPasswordNotif(false)
  const data={
    firstName:firstName,
    lastName:lastName,
    tel:tel,
    adresse:adresse,
    cp:cp,
    city:city,
    mail:mail,
    mdp:mdp
  }
  for (const key in data) {
    if(data[key]===undefined){
      setNotif(true)
      return
    }
  }
  userAPI.createUser(data).then((resp) => {
    console.log(resp.data)
    console.log("succes")
  }).catch(error => {
    console.log(error)
  })
}

const [firstName,setFirstName]=useState()
const [lastName,setLastName]=useState()
const [mail,setMail]=useState()
const [mdp,setMdp]=useState()
const [resetPassword, setResetPassword]=useState()
const [passwordNotif, setPasswordNotif]=useState(false)
const [notif, setNotif]=useState(false)
const [tel,setTel]=useState()
const [adresse,setAdresse]=useState()
const [cp,setCP]=useState()
const [city,setCity]=useState()

 return(
   <div className='form'>
    <div>Nouveau compte</div>
    <div onClick={()=>{isOpen(false)}}>fermer</div>
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

   <div>Les informations suivantes servent à votre connexion</div>
   
   <div className='form-input'>
    <label>Mail</label>
    <input type='email' onChange={(e)=>{setMail(e.target.value)}}></input>
   </div>
   <div className='form-input'>
    <label>Mot de pass</label>
    <input type='password' onChange={(e)=>{setMdp(e.target.value)}}></input>
   </div>
   <div className='form-input'>
    <label>Resaisissez votre mot de passe</label>
    <input type='password' onChange={(e)=>{setResetPassword(e.target.value)}}></input>
    {passwordNotif&& <div>Mots de passe non identiques</div>}
    {notif&& <div>Aucun champs ne peut être vide</div>}
   </div>

   <div onClick={()=>addUser()}> Valider</div>
  </div>
 )

}
export default NewCompteCard