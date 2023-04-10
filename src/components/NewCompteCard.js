import React, { useState, useEffect } from 'react'
import userAPI from '../api/userAPI'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../redux/authReducer'

const NewCompteCard=({isOpen})=>{

const [firstName,setFirstName]=useState()
const [lastName,setLastName]=useState()
const [mail,setMail]=useState()
const [mdp,setMdp]=useState()
const [resetPassword, setResetPassword]=useState()
const [mailNotif, setMailNotif]=useState(false)
const [passwordNotif, setPasswordNotif]=useState(false)
const [createUserNotif, setcreateUserNotif]=useState(false)
const [connexionNotif, setconnexionNotif]=useState(false)
const [notif, setNotif]=useState(false)
const [tel,setTel]=useState()
const [adresse,setAdresse]=useState()
const [cp,setCP]=useState()
const [city,setCity]=useState()

const dispatch = useDispatch();

useEffect(()=>{
  userAPI.getUserByMail(mail).then((resp)=>{
    resp.data.exist ? setMailNotif(true):setMailNotif(false)
  })
}
,[mail])

useEffect(()=>{
  resetPassword!==mdp? setPasswordNotif(true) : setPasswordNotif(false)
}
,[resetPassword])

const mergeCart=()=>{
  const visitorCart = JSON.parse(localStorage.getItem('visitorCart'))
  if (visitorCart){
    localStorage.setItem("cart",JSON.stringify({cart:visitorCart.cart}))
    localStorage.removeItem('visitorCart')
  }
}

const addUser=()=>{
  if (resetPassword!==mdp) {
    return
  }
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
    if(data[key]===undefined||data[key]===""){
      setNotif(true)
      return
    }
  }
  setNotif(false)
  userAPI.createUser(data).then((resp) => {
    const data={
      mail:mail,
      mdp:mdp
    }
    userAPI.connexion(data).then((resp) => {
      if(resp.data.auth){
        mergeCart()
        localStorage.setItem("auth",JSON.stringify({
         token: resp.data.token,
         user:resp.data.user
        }))
      }
      dispatch(authActions.loginSuccess())
      isOpen(false)
    }).catch(error => {
      setconnexionNotif(true)
      console.log(error)
    })
  }).catch(error => {
    setcreateUserNotif(true)
    console.log(error)
  })
}

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
    {mailNotif&& <div>Mail déjà utilisé</div>}
    {passwordNotif&& <div>Mots de passe non identiques</div>}
    {notif&& <div>Aucun champs ne peut être vide</div>}
    {connexionNotif&& <div>Connexion Automatique échouée, veuillez vous connecter ultérieurement</div>}
    {createUserNotif&& <div>Création de compte échouée, veuillez essayer ultérieurement</div>}

   </div>

   <div onClick={()=>addUser()}> Valider</div>
  </div>
 )

}
export default NewCompteCard