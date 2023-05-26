import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import {useParams,useNavigate, Navigate} from 'react-router-dom'
import productAPI from "../../api/productAPI"
import ArchiveProduct from "../../components/ArchiveProduct"

const AllProducts = () => {
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 const isAdmin = useSelector(state => state.auth.isAdmin)
 const [filter,setFilter]=useState()
 const [closefilter,setCloseFilter]=useState(false)
 const [products,setProducts]=useState()
 const navigate=useNavigate()

 useEffect(()=>{
  productAPI.getAll().then((resp) => {
    setProducts(resp.data)
  })
 },[closefilter])

 useEffect(()=>{
  if (filter){
   productAPI.getProductsByFilter(filter.param, filter.value).then((resp) => {
   setProducts(resp.data)
  })
  } 
},[filter])

 return(
  isLoggedIn&&isAdmin?
  <div className="admin-container">
    <div className="admin-category-title">
      <div>Gestion des produits</div>
      <div className="clickable" onClick={()=>{navigate("/home/admin")}}>Retour</div>
    </div>
    <div className="admin-filtre">
      <div className="clickable button" onClick={()=>{setCloseFilter(true)}}> All </div>
      <div className="clickable button" onClick={()=>{setFilter({param:"category",value:"ENTREE"})}}> Entrée </div>
      <div className="clickable button" onClick={()=>{setFilter({param:"category",value:"PLAT"})}}> Plat </div>
      <div className="clickable button" onClick={()=>{setFilter({param:"category",value:"DESSERT"})}}> Dessert </div>
    </div>
    <div className="archive-container">
      {products && products.length!==0 ? products.map((product)=>
      <div key={product.idProduct}>
       <ArchiveProduct product={product} />
      </div>
      )
      :
      <div className="background-transparent">Aucun produit trouvé</div>
      }
    </div>
  </div>
  :
  <Navigate to={'/'} />
 )
}

export default AllProducts