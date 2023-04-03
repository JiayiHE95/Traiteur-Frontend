import React, { useState,useEffect } from 'react'
import pictureAPI from '../api/pictureAPI';
import productAPI from '../api/productAPI';
const ProductCard=({product})=>{
 let imagePath = window.location.origin+"/product_picture/";
 const [pictures, setPictures] = useState()
 const [path,setPath]=useState()

 useEffect(()=>{ 
  product&&
   productAPI.getPicturesByProduct(product.idProduct).then((resp) => {
    setPictures(resp.data)
  }).catch(error => {
    console.log(error)
  })
 },[])

 useEffect(()=>{ 
  if (pictures!=undefined){
   console.log(pictures)
   console.log(pictures[0].namePicture)
   imagePath+=pictures[0].namePicture
   setPath(imagePath)
   console.log(path)
  }
 },[pictures])

 return(
  path!=undefined&&
  <div>
   <img src={path} style={{width: "200px", height: "200px"}}/>
   <div>{product.nameProduct}</div>

   
  </div>
 ) 

}
export default ProductCard