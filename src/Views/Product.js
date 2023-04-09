import React, { useEffect } from "react"
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from "../redux/authReducer"
import productAPI from "../api/productAPI";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";

const Product = () => {
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 const user = useSelector(state => state.auth.user)
 const [products, setProducts] = useState()
 const navigate=useNavigate()
 const dispatch = useDispatch();

 useEffect(()=>{ 
   productAPI.getAll().then((resp) => {
     setProducts(resp.data)
    }).catch(error => {
      console.log(error)
    })
  },[])

 return(
  <div>
    <NavBar/>
   {products ? products.map((product,index)=>(
    <div key={index}>
      <ProductCard product={product} />
    </div>
   )):<div>Chargement en Cours...</div>
  }
  </div>
 )
}

export default Product