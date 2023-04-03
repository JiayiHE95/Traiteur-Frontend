import React from "react"
import {useParams} from "react-router-dom"
const ClientHome = () => {
 const {userId}=useParams() 

 return(
  <div>test page client {userId}</div>
 )
}

export default ClientHome