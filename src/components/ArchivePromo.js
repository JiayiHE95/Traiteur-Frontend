import React, { useState,useEffect } from 'react'
import {TbAlertCircle} from 'react-icons/tb'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import promoAPI from '../api/promoAPI'
import {RiPriceTagLine} from 'react-icons/ri'

const ArchivePromo=({promo})=>{

 const [modify,setModify]=useState(false)
 const [deletePromo,setDeletePromo]=useState(false)
 const [notif, setNotif]=useState(false)
 const [success, setSuccess]=useState(false)
 const [deleteSuccess, setDeleteSuccess]=useState(false)
 const [codePromo,setCodePromo]=useState(promo.codePromo)
 const [percent,setPercent]=useState((1-promo.percent).toFixed(2)*100)

const updatePromo=()=>{
  let data={
   codePromo:codePromo,
   percent:percent
  }
  for (const key in data) {
    if(data[key]===undefined||data[key]===""){
     setNotif(true)
      return
    }
  }
  data["percent"]=(1-percent/100).toFixed(2)
  promoAPI.update(data).then((res)=>{
    if(res.data.update){
      setSuccess(true)
    }
  }) 
}

const deleteCodePromo=()=>{
  promoAPI.delete(promo.codePromo).then((res)=>{
    if(res.data.delete){
     setDeleteSuccess(true)
    }
  })
}

 return(
  promo &&
  (!modify?
   (!deletePromo ?
    <div className='product-card'>
    <div><b>{promo.codePromo}</b></div>
    <div>{((1-promo.percent)).toFixed(2)*100} %</div>
    <div className='product-card-modify'>
      <div className='clickable button' onClick={()=>{setModify(true); setSuccess(false)}}>Modifier</div>
      <div className='clickable button' onClick={()=>{setDeletePromo(true)}}>Supprimer</div>
    </div>
    </div>  
   :
    <div className='product-card'>
    <div><b>Supprimer "{promo.codePromo}"</b></div>
    {deleteSuccess &&<div className="notif-succes"><AiOutlineCheckCircle className='error-icon'/><div>Suppression réussite</div></div>}
    {!deleteSuccess &&
    <div className='product-card-modify'>
      <div className='clickable button' onClick={()=>{deleteCodePromo()}}>Comfirmer</div>
      <div className='clickable button' onClick={()=>{setDeletePromo(false)}}>Annuler</div>
    </div>}
    </div> 
   )
   :
   <div className='product-card'> 
    <div><b>{promo.codePromo}</b></div>
    <div className='form-inputs'>
     <div className='form-input'>
      <RiPriceTagLine className='icon'/>
     <input type='number' min={1} max={99} placeholder="Pourcentage" value={percent} onChange={(e)=>{setPercent(e.target.value)}}></input>
     </div>
    </div>
    {notif&& !success && <div className="notif-error"><TbAlertCircle className='error-icon'/>Aucun champs ne peut être vide</div>}
    {success &&<div className="notif-succes"><AiOutlineCheckCircle className='error-icon'/><div>Changement d'informations réussi</div></div>}
    {!success &&<div className='product-card-modify'>
     <div className='clickable button' onClick={()=>{updatePromo()}}>Confirmer</div>
     <div className='clickable button' onClick={()=>{setModify(false)}}>Annuler</div>
    </div>}
   </div>
  )
 ) 

}
export default ArchivePromo