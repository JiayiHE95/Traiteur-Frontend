import React, { useState } from 'react'
import store from '../redux/store'
import { authActions } from '../redux/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import userAPI from '../api/userAPI'
const LoginCard=({isOpen, reset})=>{
  const dispatch = useDispatch();
  const [isLogged, setIsLogged]=useState(false)
  const [isOpenedPasswordReset, setIsOpenedPasswordReset] = useState(false)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  console.log("ici",isLoggedIn)
  const check=()=>{ 
    console.log(JSON.parse(localStorage.getItem("auth")).token)
    userAPI.check({
      headers:{
        "x-access-token":JSON.parse(localStorage.getItem("auth")).token
        }
    }).then((resp) => {
      console.log(resp.data)
    }).catch(error => {
    })
  }

  const connexion=()=>{
    const data={
      mail:mail,
      mdp:mdp
    }
    userAPI.connexion(data).then((resp) => {
      console.log(resp.data)
      if(resp.data.auth){
        setIsLogged(true)
        localStorage.setItem("auth",JSON.stringify({
         token: resp.data.token,
         mail:mail,
         user:resp.data.result[0]
        }))
        store.dispatch(authActions.loginSuccess())
      } else{
        store.dispatch(authActions.logout)
        setIsLogged(false)
      }
    }).catch(error => {
      console.log(error)
      setIsLogged(false)
    })
  }
  const [mail,setMail]=useState()
  const [mdp,setMdp]=useState()

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
   <div onClick={()=>connexion()}>valide</div>

   <div onClick={()=>check()}>Check is logged</div>
  </div>
 )

}
export default LoginCard