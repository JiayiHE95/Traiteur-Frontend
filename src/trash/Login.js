import React from "react"
import LoginCard from "../components/LoginCard"
import NewCompteCard from "../components/NewCompteCard"
import PasswordResetCard from "../components/PasswordResetCard"
const Login = ({mode}) => {

 return(
  <div className="login">
  
   {mode==="login"&& <LoginCard/>}
   {mode==="password-reset"&&<PasswordResetCard/>}
   {mode==="new-compte"&&<NewCompteCard/>}

  </div>
 )
}

export default Login