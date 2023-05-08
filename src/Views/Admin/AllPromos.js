import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import {useParams,useNavigate, Navigate} from 'react-router-dom'
import promoAPI from "../../api/promoAPI"
import ArchivePromo from "../../components/ArchivePromo"
import {TbAlertCircle} from 'react-icons/tb'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import {AiOutlineBarcode} from 'react-icons/ai'
import {RiPriceTagLine} from 'react-icons/ri'
import {AiOutlinePlusCircle} from 'react-icons/ai'

const AllPromos = () => {
 const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
 const isAdmin = useSelector(state => state.auth.isAdmin)
 const [modify,setModify]=useState(false)
 const [notif, setNotif]=useState(false)
 const [codeNotif, setCodeNotif]=useState(false)
 const [success, setSuccess]=useState(false)
 const [codePromo,setCodePromo]=useState()
 const [percent,setPercent]=useState()
 const [promos,setPromos]=useState()
 const navigate=useNavigate()

 useEffect(()=>{
  promoAPI.getAll().then((resp) => {
   if(resp.data){
    setPromos(resp.data)
   }
  })
 },[])

 useEffect(()=>{
  setNotif(false)
  setCodeNotif(false)
 },[codePromo, percent])

 const addPromo=()=>{
  let data={
   codePromo:codePromo.toUpperCase(),
   percent:percent
  }
  for (const key in data) {
    if(data[key]===undefined||data[key]===""){
     setNotif(true)
      return
    }
  }
  data["percent"]=(1-percent/100).toFixed(2)
  promoAPI.verifyPromo(codePromo).then((resp) => {
   if(resp.data.codePromo){
    setCodeNotif(true)
    return
   }else{
     promoAPI.addPromo(data).then((resp) => {
      if(resp.data){
       setSuccess(true)
       promoAPI.getAll().then((resp) => {
        if(resp.data){
         setPromos(resp.data)
        }
       })
      }
     })
   }
  })

 }

 return(
  isLoggedIn&&isAdmin?
  <div className="admin-container">
    <div className="admin-category-title">
      <div>Gestion des codes promo</div>
      <div className="clickable" onClick={()=>{navigate("/home/admin")}}>Retour</div>
      <AiOutlinePlusCircle className="clickable icon" onClick={()=>{setModify(true)}}/>
    </div>
    <div className="archive-container">
      {modify&&
      <div className='product-card'>
       <div className='form-inputs'>
        <div className='form-input'>
         <AiOutlineBarcode className='icon'/>
        <input type='text' placeholder="Code promo" value={codePromo} onChange={(e)=>{setCodePromo(e.target.value)}}></input>
        </div>
        <div className='form-input'>
         <RiPriceTagLine className='icon'/>
        <input type='number' min={1} max={99} placeholder="Pourcentage" value={percent} onChange={(e)=>{setPercent(e.target.value)}}></input>
        </div>
       </div>
       {notif&& !success && <div className="notif-error"><TbAlertCircle className='error-icon'/>Aucun champs ne peut être vide</div>}
       {codeNotif&& !success && <div className="notif-error"><TbAlertCircle className='error-icon'/>Code promo existe déjà</div>}
       {success &&<div className="notif-succes"><AiOutlineCheckCircle className='error-icon'/><div>Changement d'informations réussi</div></div>}
       {!success &&<div className='product-card-modify'>
        <div className='clickable button' onClick={()=>{addPromo()}}>Confirmer</div>
        <div className='clickable button' onClick={()=>{setModify(false)}}>Annuler</div>
       </div>}
      </div>}
      {promos && promos.length!==0 ? promos.map((promo)=>
       <div key={promo.codePromo}>
        <ArchivePromo promo={promo} />
       </div>)
       :
       <div className="background-transparent">Aucun code promo trouvé</div>
      }
    </div>
  </div>
  :
  <Navigate to={'/'} />
 )
}

export default AllPromos