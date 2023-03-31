import React, { useEffect } from "react"
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import LoginCard from "../../components/LoginCard";
import PasswordResetCard from "../../components/PasswordResetCard";
import NewCompteCard from "../../components/NewCompteCard";
import userAPI from "../../api/userAPI";
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from "../../redux/authReducer"

const Home = ({mode}) => {
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 console.log("là bas",isLoggedIn)
 const navigate=useNavigate()
 const [isOpenedLogin, setIsOpenedLogin] = useState(false)
 const [isOpenedNewCompte, setIsOpenedNewCompte] = useState(false)
 const [isOpenedPasswordReset, setIsOpenedPasswordReset] = useState(false)
 const [isLogged, setIsLogged]=useState(false)
 const dispatch = useDispatch();
 /*
 useEffect(()=>{
  try{
   const auth=JSON.parse(localStorage.getItem("auth"))
   if(!auth){
    setIsLogged(false)
   }
   console.log(auth.token)
   console.log("isl",isLogged)
   userAPI.check({
    headers:{"x-access-token":auth.token}
   }).then((resp) => {
    console.log("coucou")
    if (resp.data.auth){
     setIsLogged(true)
     dispatch(authActions.loginSuccess())
    }else{
     setIsLogged(false)
     dispatch(authActions.logout())
    }
   }).catch(error => {
   })
  } catch{

  }
 })*/

 return(
  <div>
   <div>titre : Traiteur chinois</div>
   <div>
   {isLoggedIn?
    <div onClick={()=>dispatch(authActions.logout())}>Déconnecion</div>
    :
    <div>
     <div onClick={()=>setIsOpenedLogin(true)}>Connexion</div>
     <div onClick={()=>setIsOpenedNewCompte(true)}>Créer un compte</div>
    </div>
   }     
   </div>
   <div>
    <div onClick={()=>{navigate("/")}}>Home</div>
    <div onClick={()=>{navigate("/products")}}>Produits</div>
   </div>
   <div>une image</div>
   <div onClick={()=>{navigate("/products")}}>découvrir nos plats</div>

   {isOpenedLogin&& <LoginCard isOpen={setIsOpenedLogin} reset={setIsOpenedPasswordReset}/>}
   {isOpenedNewCompte&& <NewCompteCard isOpen={setIsOpenedNewCompte} />}
   {isOpenedPasswordReset&&<PasswordResetCard isOpen={setIsOpenedPasswordReset}/>}

  </div>
 )
}

export default Home