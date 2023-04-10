import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { verifyToken } from '../redux/authReducer'
import { authActions } from '../redux/authReducer'
import LoginCard from './LoginCard'
import NewCompteCard from './NewCompteCard'
import PasswordResetCard from './PasswordResetCard'

const NavBar =({show=true})=>{
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 const user = useSelector(state => state.auth.user)
 const navigate=useNavigate()
 const [isOpenedLogin, setIsOpenedLogin] = useState(false)
 const [isOpenedNewCompte, setIsOpenedNewCompte] = useState(false)
 const [isOpenedPasswordReset, setIsOpenedPasswordReset] = useState(false)
 const dispatch = useDispatch();
 
 useEffect(()=>{ 
  dispatch(verifyToken())
 },[])

 useEffect(()=>{ 
  isOpenedLogin && setIsOpenedNewCompte(false)
  isOpenedNewCompte && setIsOpenedLogin(false)
 },[isOpenedLogin,isOpenedNewCompte])

 return(
  <div>
   <div onClick={()=>{navigate("/")}}>titre : Traiteur chinois</div>
   {isLoggedIn && user ?
    <div>
     {user.isAdmin ==1 &&<div>page Admin</div>}
     <div onClick={()=>dispatch(authActions.logout())}>Déconnecion</div>
     <div onClick={()=>{navigate("/home/:idUser")}}>{user.firstname}</div>
     <div onClick={()=>{navigate("/panier")}}>Panier</div>
    </div>
    :
    <div>
     <div onClick={()=>setIsOpenedLogin(true)}>Connexion</div>
     <div onClick={()=>setIsOpenedNewCompte(true)}>Créer un compte</div>
     <div onClick={()=>{navigate("/panier")}}>Panier</div>
    </div>
   }  
   {show&&
   <div>
    <div onClick={()=>{navigate("/")}}>Home</div>
    <div onClick={()=>{navigate("/products")}}>Produits</div>
   </div>
   }   

   {isOpenedLogin&& <LoginCard isOpen={setIsOpenedLogin} reset={setIsOpenedPasswordReset}/>}
   {isOpenedNewCompte&& <NewCompteCard isOpen={setIsOpenedNewCompte} />}
   {isOpenedPasswordReset&&<PasswordResetCard isOpen={setIsOpenedPasswordReset}/>}
   </div>
   )
}
export default NavBar