import React from "react"
import {useParams} from "react-router-dom"
const AdminHome = () => {
 const {userId}=useParams() 

 return(
  <div>test page AdminHome {userId}</div>
 )
}

export default AdminHome