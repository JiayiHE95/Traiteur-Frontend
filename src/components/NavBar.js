import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { verifyToken } from '../redux/authReducer'
import { authActions } from '../redux/authReducer'
import LoginCard from './LoginCard'
import NewCompteCard from './NewCompteCard'
import PasswordResetCard from './PasswordResetCard'
import {FaBars} from 'react-icons/fa'

const NavBar =()=>{
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 const user = useSelector(state => state.auth.user)
 const navigate=useNavigate()
 const [isOpenedLogin, setIsOpenedLogin] = useState(false)
 const [isOpenedNewCompte, setIsOpenedNewCompte] = useState(false)
 const [isOpenedPasswordReset, setIsOpenedPasswordReset] = useState(false)
 const [isOpenedDropdown, setIsOpenedDropdown] = useState(false)
 const dispatch = useDispatch();
 let imagePath = window.location.origin+"/picture/";
 
 useEffect(()=>{ 
  dispatch(verifyToken())
 },[])

 useEffect(()=>{ 
  isOpenedLogin && setIsOpenedNewCompte(false)
  isOpenedNewCompte && setIsOpenedLogin(false)
 },[isOpenedLogin,isOpenedNewCompte])


 return(
  <div className='navbar-container'>
   <div className='logo clickable' onClick={()=>{navigate("/")}}>
      <img src={imagePath+'logo1.png'}  />
      <div className='logo-name'>Traiteur LIAN</div>
   </div>
   <div className='clickable toggle' onClick={()=>{setIsOpenedDropdown(!isOpenedDropdown)}}><FaBars/></div>
   {isLoggedIn && user ?
    <div className='navbar'>
      <div className='clickable' onClick={()=>{navigate("/about")}}>About</div>
      {(user.isAdmin ===1 || user.isAdmin ===true) &&
      <div className='clickable' onClick={()=>{navigate("/home/admin")}}>Admin</div>}
      <div className='clickable' onClick={()=>{navigate("/products")}}>Produits</div>
      <div className='clickable' onClick={()=>{navigate(`/home/user/${user.idUser}`)}}>{user.firstname}</div>
      <div className='clickable' onClick={()=>{navigate("/panier")}}>Panier</div>
      <div className='clickable' onClick={()=>dispatch(authActions.logout())}>Déconnexion</div>
    </div>
    :
    <div className='navbar'>
      <div className='clickable' onClick={()=>{navigate("/about")}}>About</div>
      <div className='clickable' onClick={()=>{navigate("/products")}}>Produits</div>
      <div className='clickable' onClick={()=>{navigate("/panier")}}>Panier</div>
      <div className='clickable login-popup' onClick={()=>setIsOpenedLogin(true)}>Connexion</div>
    </div>
   }  

  {isLoggedIn && user ?
    <div className={isOpenedDropdown ? 'dropdown-navbar-open':'dropdown-navbar'}>
      <div className='clickable' onClick={()=>{navigate("/about")}}>About</div>
      {(user.isAdmin ===1 || user.isAdmin ===true) &&
      <div className='clickable' onClick={()=>{navigate("/home/admin")}}>Admin</div>}
      <div className='clickable' onClick={()=>{navigate("/products")}}>Produits</div>
      <div className='clickable' onClick={()=>{navigate(`/home/user/${user.idUser}`)}}>{user.firstname}</div>
      <div className='clickable' onClick={()=>{navigate("/panier")}}>Panier</div>
      <div className='clickable' onClick={()=>{dispatch(authActions.logout());setIsOpenedDropdown(!isOpenedDropdown)}}>Déconnexion</div>
    </div>
    :
    <div className={isOpenedDropdown ? 'dropdown-navbar-open':'dropdown-navbar'} >
      <div className='clickable' onClick={()=>{navigate("/about")}}>About</div>
      <div className='clickable' onClick={()=>{navigate("/products")}}>Produits</div>
      <div className='clickable' onClick={()=>{navigate("/panier")}}>Panier</div>
      <div className='clickable login-popup' onClick={()=>{setIsOpenedLogin(true);setIsOpenedDropdown(!isOpenedDropdown)}}>Connexion</div>
    </div>
   }  

   {isOpenedLogin&& <LoginCard isOpen={setIsOpenedLogin} newCompte={setIsOpenedNewCompte} reset={setIsOpenedPasswordReset}/>}
   {isOpenedNewCompte&& <NewCompteCard isOpen={setIsOpenedNewCompte} />}
   {isOpenedPasswordReset&&<PasswordResetCard isOpen={setIsOpenedPasswordReset}/>}
   </div>
   )
}
export default NavBar