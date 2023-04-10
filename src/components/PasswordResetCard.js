import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import userAPI from '../api/userAPI'
import {useNavigate} from 'react-router-dom'

const PasswordResetCard=({isOpen})=>{

  const [user,setUser]=useState()
  const [mail,setMail]=useState()
  const [mdp,setMdp]=useState("")
  const [isValide,setIsValide]=useState(false)
  const [resetPassword, setResetPassword]=useState()
  const [notif, setNotif]=useState(false)
  const [mailNotif, setMailNotif]=useState()
  const [passwordNotif, setPasswordNotif]=useState(false)
  const navigate=useNavigate()
  const { token } = useParams();
  
  useEffect(()=>{ 
    if (token !==undefined){
      userAPI.checkToken({
        headers:{"pw-token":token}
      }).then((resp)=>{
        setIsValide(resp.data.auth)
        if(resp.data.auth){
          userAPI.getUserByPWToken(token).then((resp)=>{
            setUser(resp.data[0])
          })
        }
      })
    }
  },[])

  useEffect(()=>{
    resetPassword!==mdp? setPasswordNotif(true) : setPasswordNotif(false)
  }
  ,[resetPassword,mdp])

  const passwordForgot=()=>{
    const data={mail:mail}
    userAPI.passwordForgot(data).then((resp) => {
      setMailNotif(resp.data)
    })
  }

  const passwordReset=()=>{
    if (resetPassword!==mdp || mdp==="" || user ===undefined) {return}
    const data={mdp:mdp, mail:user.mail}
    userAPI.passwordReset(data).then((resp) => {
      setMailNotif(resp.data)
    })
  }

  return(
    token ? (
      isValide && user ?
      <div className='form'>
        <div>Réinitialisez le mot de pass</div>
        <div>{user.mail}</div>
        <div className='form-input'>
          <label>Mot de pass</label>
          <input type='password' onChange={(e)=>{setMdp(e.target.value)}}></input>
        </div>
        <div className='form-input'>
          <label>Mot de passe oublié</label>
          <input type='password' onChange={(e)=>{setResetPassword(e.target.value)}}></input>
          {passwordNotif&& <div>Mots de passe non identiques</div>}
          {notif&& <div>Aucun champs ne peut être vide</div>}
        </div>
        <div onClick={()=>passwordReset()}> Valider</div>
        {mailNotif&&<div>{mailNotif}</div>}
        <div onClick={()=>{navigate("/")}}>Retourner à la page d'accueil</div>
      </div>
      :
      <div>
        <div>Token expiré, veuillez refaire une demande d'initialisation du mot de passe</div>
        <div onClick={()=>{navigate("/")}}>Retourner à la page d'accueil</div>
      </div>
    )
    :
    <div className='form'>
      <div>Mot de passe oublié</div>
      <div onClick={()=>{isOpen(false)}}>fermer</div>
      <div className='form-input'>
      <label>Mail</label>
        <input type='text' onChange={(e)=>{setMail(e.target.value)}}></input>
      </div>
      <div onClick={()=>passwordForgot()}> Valider</div>
      {mailNotif&&<div>{mailNotif}</div>}
      <div onClick={()=>{navigate("/")}}>Retourner à la page d'accueil</div>
    </div>
    
  )

}
export default PasswordResetCard