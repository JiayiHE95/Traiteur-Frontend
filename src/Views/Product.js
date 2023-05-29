import React, { useEffect } from "react"
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import productAPI from "../api/productAPI";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";

const Product = () => {
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 const user = useSelector(state => state.auth.user)
 const [products, setProducts] = useState()

 useEffect(()=>{ 
   productAPI.getAll().then((resp) => {
     setProducts(resp.data)
    }).catch(error => {
      console.log(error)
    })
  },[])

 return(
  <div className="site-container">
    <NavBar/>
    <div className="product-container">
      {products ? products.map((product,index)=>(
        <div key={index} className='product'>
          <ProductCard product={product} />
        </div>
      )):<div  className="background-transparent">Chargement en Cours...</div>
      }
    </div>
  </div>
 )
}

export default Product