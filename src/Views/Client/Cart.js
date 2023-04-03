import React, { useEffect }  from "react"
import {useParams} from "react-router-dom"

import { useDispatch, useSelector } from 'react-redux'
import { authActions } from "../../redux/authReducer";
import { verifyToken } from "../../redux/authReducer";

const Cart = () => {
 const {idUser}=useParams() 
 const dispatch = useDispatch();
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 const user = useSelector(state => state.auth.user)
 
 useEffect(()=>{ 
  dispatch(verifyToken())
 },[])


 return(
  isLoggedIn?

  <div>test page panier {idUser}</div>:<div>error</div>
 )
}

export default Cart