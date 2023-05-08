import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../redux/authReducer'
import userAPI from '../api/userAPI';
import {TbAlertCircle} from 'react-icons/tb'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import {TbAddressBook} from 'react-icons/tb'
import {RxCodesandboxLogo} from 'react-icons/rx'
import {MdMail,MdPerson,MdPersonOutline, MdKey,MdPhone, MdOutlineCancel, MdLocationCity} from 'react-icons/md'

const PersonalData=()=>{
const [user,setUser]=useState(useSelector(state => state.auth.user))
 //const user = useSelector(state => state.auth.user)
 const [newPassword,setNewPassword]=useState(false)
 const [passwordReset,setPasswordReset]=useState(false)
 const [infoReset,setInfoReset]=useState(false)
 const [oldPassword,setOldPassword]=useState(false)
 const [passwordSucces,setPasswordSucces]=useState(false)
 const [infoSucces,setInfoSucces]=useState(false)
 const [resetPassword, setResetPassword]=useState()
 const [notif, setNotif]=useState(false)
 const [pwnotif, setPwNotif]=useState(false)
 const [oldpwnotif, setOldPwNotif]=useState(false)
 const dispatch = useDispatch();

 const [newfirstName,setNewFirstName]=useState(user.firstname)
 const [newlastName,setNewLastName]=useState(user.lastname)
 const [newmail,setNewMail]=useState(user.mail)
 const [newtel,setNewTel]=useState(user.telephone)
 const [newadresse,setNewAdresse]=useState(user.adresse)
 const [newcp,setNewCP]=useState(user.cp)
 const [newcity,setNewCity]=useState(user.city)

 useEffect(()=>{ 
  setNotif(false)
  setPwNotif(false)
  setOldPwNotif(false)
  setPasswordSucces(false)
 },[resetPassword,oldPassword,newPassword])

 const changePassword=()=>{
  if(resetPassword!==newPassword){
   setPwNotif(true)
   return
  }
  let data={
   mdp:oldPassword,
   newPassword:newPassword,
   oldPassword:oldPassword
  }
 for (const key in data) {
   if(data[key]===undefined||data[key]===""){
     setNotif(true)
     return
   }
 }
 data={
  mdp:oldPassword,
  mail:user.mail
 }
 userAPI.checkPassword(data).then((resp)=>{
  data.mdp=newPassword
  if(resp.data.passwordCorrect){
   userAPI.passwordReset(data).then((resp)=>{
    if(resp.data.reset){
     setPasswordSucces(true)
     setPasswordReset(false)
    }
   })
  }else{
   setOldPwNotif(true)
  }
 })
}
const changeInfos=()=>{
  let data={
    firstname:newfirstName,
    lastname:newlastName,
    mail:newmail,
    telephone:newtel,
    adresse:newadresse,
    cp:newcp,
    city:newcity,
    idUser:user.idUser
  }
  for (const key in data) {
    if(data[key]===undefined||data[key]===""){
      setNotif(true)
      return
    }
  }
  userAPI.updateUser(data).then((resp)=>{
    if(resp.data.update){
    setInfoSucces(true)
    setInfoReset(false)
    dispatch(authActions.loginUpdate())
    userAPI.getUserById(user.idUser).then((resp)=>{
      setUser(resp.data)
    })
    }
  })
}

 return(
  user&&
  <div className='personal-data'>
   <div className="text-bold">Informations Personnelles</div>
   {!infoReset && <div>{user.firstname} {user.lastname}</div>}
   {!infoReset &&<div>{user.telephone}</div>}
   {!infoReset &&<div>{user.mail}</div>}
   {!infoReset &&<div>{user.adresse}, {user.city}, {user.cp}</div>}
   {!passwordReset&& !infoReset&&<div className='clickable button' onClick={()=>{setPasswordReset(true); setPasswordSucces(false)}}>Changer le mot de passe</div>}
   {!passwordReset&& !infoReset&&<div className='clickable button' onClick={()=>{setInfoReset(true); setInfoSucces(false)}}>Changer les informtions</div>}
   {passwordSucces&&<div className="notif-succes"><AiOutlineCheckCircle className='error-icon'/><div>Changement de mot de passe réussi</div></div>}
   {infoSucces&&<div className="notif-succes"><AiOutlineCheckCircle className='error-icon'/><div>Changement d'informations réussi</div></div>}
  
   {passwordReset&&
   <div className='form-inputs'>
      <div className='form-input'>
      <MdKey className='icon'/>
      <input placeholder='Ancien mot de passe' type='password' onChange={(e)=>{setOldPassword(e.target.value)}}></input>
      </div>
      <div className='form-input'>
      <MdKey className='icon'/>
      <input placeholder='Nouveau mot de passe' type='password' onChange={(e)=>{setNewPassword(e.target.value)}}></input>
      </div>
      <div className='form-input'>
      <MdKey className='icon'/>
      <input placeholder='Resaisissez le nouveau mot de passe' type='password' onChange={(e)=>{setResetPassword(e.target.value)}}></input>
      </div>
      {notif&& <div className="notif-error"><TbAlertCircle className='error-icon'/>Aucun champs ne peut être vide</div>}
      {pwnotif&& <div className="notif-error"><TbAlertCircle className='error-icon'/>Mots de passe non identiques, veuillez resaisir</div>}
      {oldpwnotif&& <div className="notif-error"><TbAlertCircle className='error-icon'/>Mot de passe non correct, veuillez resaisir</div>}
    </div>
   }

   {infoReset&&
    <div className='form-inputs'>
    <div className='form-input'>
      <MdPerson className='icon'></MdPerson>
    <input type='text' placeholder="Nom" value={newlastName} onChange={(e)=>{setNewLastName(e.target.value)}}></input>
    </div>
    <div className='form-input'>
      <MdPersonOutline className='icon'></MdPersonOutline>
    <input type='text' placeholder="Prénom" value={newfirstName} onChange={(e)=>{setNewFirstName(e.target.value)}}></input>
    </div>
    <div className='form-input'>
      <MdPhone className='icon'></MdPhone>
      <input type='text' placeholder="Téléphone" value={newtel} onChange={(e)=>{setNewTel(e.target.value)}}></input>
    </div>
    <div className='form-input'>
      <MdMail className='icon'></MdMail>
      <input type='email' placeholder="Mail" value={newmail} onChange={(e)=>{setNewMail(e.target.value)}}></input>
    </div>
    <div className='form-input'>
      <TbAddressBook className='icon'></TbAddressBook>
      <input type='text' placeholder="Adresse" value={newadresse} onChange={(e)=>{setNewAdresse(e.target.value)}}></input>
    </div>
    <div className='form-input'>
      <RxCodesandboxLogo className='icon'/>
      <input type='text' placeholder="Code Postale" value={newcp} onChange={(e)=>{setNewCP(e.target.value)}}></input>
    </div>
    <div className='form-input'>
      <MdLocationCity className='icon'></MdLocationCity>
      <input type='text' placeholder="Ville" value={newcity} onChange={(e)=>{setNewCity(e.target.value)}}></input>
    </div>
  </div>
   }
  {passwordReset&&<div className='clickable button' onClick={()=>changePassword()}>Comfirmer</div>}
  {passwordReset&&<div className='clickable button' onClick={()=>setPasswordReset(false)}>Annuler</div>}
  {infoReset&&<div className='clickable button' onClick={()=>changeInfos()}>Comfirmer</div>}
  {infoReset&&<div className='clickable button' onClick={()=>setInfoReset(false)}>Annuler</div>}
 
  </div>
 )

}
export default PersonalData