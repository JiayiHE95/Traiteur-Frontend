import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import {MdFastfood} from 'react-icons/md'
import {BiCategoryAlt} from 'react-icons/bi'
import {ImPriceTags} from 'react-icons/im'
import {TbAlertCircle} from 'react-icons/tb'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import productAPI from '../api/productAPI'

const ArchiveProduct=({product})=>{

 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 let imagePath = window.location.origin+"/product_picture/";
 const [path,setPath]=useState()
 const [modify,setModify]=useState(false)
 const [nameProduct,setNameProduct]=useState(product.nameProduct)
 const [price,setPrice]=useState(product.price)
 const [category,setCategory]=useState(product.category)
 const [notif, setNotif]=useState(false)
 const [success, setSuccess]=useState(false)

 const [pictures, setPictures] = useState()

 useEffect(()=>{ 
  product&&
   productAPI.getPicturesByProduct(product.idProduct).then((resp) => {
    setPictures(resp.data)
  }).catch(error => {
    console.log(error)
  })
 },[])

 useEffect(()=>{ 
  if (pictures!==undefined){
   imagePath+=pictures[0].namePicture
   setPath(imagePath)
  }
 },[pictures])

 const options=[
  { value: 'ENTREE', label: 'Entrée' },
  { value: 'PLAT', label: 'Plat' },
  { value: 'DESSERT', label: 'Dessert' }
]

const updateProduct=()=>{
  let data={
    idProduct:product.idProduct,
    nameProduct:nameProduct,
    price:price,
    category:category
  }
  for (const key in data) {
    if(data[key]===undefined||data[key]===""){
     setNotif(true)
      return
    }
  }
  productAPI.update(data).then((res)=>{
    if(res.data.update){
      setSuccess(true)
    }
  })
 }
const deleteProduct=()=>{
  productAPI.deleteProduct(product.idProduct).then((res)=>{
   if(res.data.delete){
    window.location.reload()
   }
  })
}

 return(
  path!==undefined && product &&
  (!modify?
  <div className='product-card'>
   <img src={path}/>
   <div>{product.nameProduct}</div>
   <div>{product.category}</div>
   <div>{product.price} euros</div>
   <div className='clickable button' onClick={()=>{setModify(true); setSuccess(false)}}>Modifier</div>
   </div>
   :
   <div className='product-card'> 
    <img src={path}/>
    <div className='form-inputs'>
     <div className='form-input'>
      <MdFastfood className='icon'/>
     <input type='text' placeholder="Nom du produit" value={nameProduct} onChange={(e)=>{setNameProduct(e.target.value)}}></input>
     </div>
     <div className='form-input'>
      <ImPriceTags className='icon'/>
     <input type='number' min={1} placeholder="Prix en euro" value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
     </div>
    </div>
    <div>
     <Select
      isMulti={false}
      name={"OrderStatus"}
      defaultValue={options.find((opt) => opt.value === product.category)}
      placeholder={"Type de produit"}
      options={options}
      onChange={(option) => { setCategory(option.value) }}
      className="Status-select"
    />
    </div>
    {notif&& !success && <div className="notif-error"><TbAlertCircle className='error-icon'/>Aucun champs ne peut être vide</div>}
    {success &&<div className="notif-succes"><AiOutlineCheckCircle className='error-icon'/><div>Changement d'informations réussi</div></div>}
    {!success &&<div className='product-card-modify'>
     <div className='clickable button' onClick={()=>{updateProduct()}}>Confirmer</div>
     <div className='clickable button' onClick={()=>{setModify(false)}}>Annuler</div>
    </div>}
   </div>
  )
 ) 

}
export default ArchiveProduct