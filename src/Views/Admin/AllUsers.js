import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import {useParams,useNavigate, Navigate} from 'react-router-dom'
import orderAPI from "../../api/orderAPI"
import userAPI from "../../api/userAPI"
import OrderCard from "../../components/OrderCard"
import ArchiveUser from "../../components/ArchiveUser"

const AllUsers = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const isAdmin = useSelector(state => state.auth.isAdmin)
  const [users,setUsers]=useState()
  const navigate=useNavigate()
 
  useEffect(()=>{
   userAPI.getAllUsers().then((resp) => {
     setUsers(resp.data)
     console.log(resp.data)
   })
  },[])
 
  return(
   isLoggedIn&&isAdmin?
   <div className="admin-container">
     <div className="admin-category-title">
       <div>Gestion des clients</div>
       <div className="clickable" onClick={()=>{navigate("/home/admin")}}>Retour</div>
     </div>
     <div className="archive-container">
       {users && users.length!==0 ? users.map((user)=>
       <div className="archive-order" key={user.idUser}>
        <ArchiveUser user={user}/>
       </div>
       )
       :
       <div className="background-transparent">Aucun client trouvé</div>
       }
     </div>
   </div>
   :
   <Navigate to={'/'} />
  )
}

export default AllUsers