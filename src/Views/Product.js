import React, { useEffect } from "react"
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import LoginCard from "../components/LoginCard";
import PasswordResetCard from "../components/PasswordResetCard";
import NewCompteCard from "../components/NewCompteCard";
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from "../redux/authReducer"
import { verifyToken } from "../redux/authReducer";
import productAPI from "../api/productAPI";
import ProductCard from "../components/ProductCard";

const Product = () => {
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 const user = useSelector(state => state.auth.user)
 const navigate=useNavigate()
 const [isOpenedLogin, setIsOpenedLogin] = useState(false)
 const [isOpenedNewCompte, setIsOpenedNewCompte] = useState(false)
 const [isOpenedPasswordReset, setIsOpenedPasswordReset] = useState(false)
 const [products, setProducts] = useState()
 const dispatch = useDispatch();

 useEffect(()=>{ 
  dispatch(verifyToken())
  productAPI.getAll().then((resp) => {
   console.log(resp.data)
   setProducts(resp.data)
   
 }).catch(error => {
   console.log(error)
 })

  //TODO enlève[] pour verification tt le temps
 },[])

 useEffect(()=>{ 
  isOpenedLogin && setIsOpenedNewCompte(false)
  isOpenedNewCompte && setIsOpenedLogin(false)
 },[isOpenedLogin,isOpenedNewCompte])


 return(
  <div>
   <div>titre : Traiteur chinois</div>
   {isLoggedIn && user ?
    <div>
     {user.isAdmin == 1 ? <div>page Admin</div>:<div></div>}
     <div onClick={()=>dispatch(authActions.logout())}>Déconnecion</div>
     <div onClick={()=>{navigate("/home/:idUser")}}>{user.firstname}</div>
     <div onClick={()=>{navigate("/panier/:idUser")}}>Panier</div>
    </div>
    :
    <div>
     <div onClick={()=>setIsOpenedLogin(true)}>Connexion</div>
     <div onClick={()=>setIsOpenedNewCompte(true)}>Créer un compte</div>
    </div>
   }     
   <div>
    <div onClick={()=>{navigate("/")}}>Home</div>
    <div onClick={()=>{navigate("/products")}}>Produits</div>
   </div>

   {isOpenedLogin&& <LoginCard isOpen={setIsOpenedLogin} reset={setIsOpenedPasswordReset}/>}
   {isOpenedNewCompte&& <NewCompteCard isOpen={setIsOpenedNewCompte} />}
   {isOpenedPasswordReset&&<PasswordResetCard isOpen={setIsOpenedPasswordReset}/>}

   <div>une image</div>
   {products ? products.map(product=>(
    <ProductCard product={product}/>
   )):<div>Chargement en Cours...</div>
  }
  </div>
 )
}

export default Product