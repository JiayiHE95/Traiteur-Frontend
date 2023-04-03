import { createSlice } from '@reduxjs/toolkit'
import userAPI from '../api/userAPI'

const authReducerInit = () => {
 try {
   const stored = JSON.parse(localStorage.getItem('auth'))
   return {
     isLoggedIn: true,
     mail: stored.mail,
     token: stored.token,
     user: stored.user,
   }
 } catch {
   return {
     isLoggedIn: false,
     mail: null,
     token: null,
     user: null,
   }
 }
}

const initialState = authReducerInit();

const authSlice = createSlice({
 name: "auth",
 initialState,
 reducers: {
     loginSuccess(state) {
         const stored = JSON.parse(localStorage.getItem("auth"));
         state.isLoggedIn = true
         state.mail = stored.mail
         state.token = stored.token
         state.user = stored.user
         state.isAdmin = stored.user.isAdmin
     },

     loginTimeOut(state) {
         state.isLoggedIn = false
         state.mail = null
         state.token = null
         state.user = null
         state.isAdmin = false
     },

     logout(state) {
         localStorage.removeItem('auth')
         state.isLoggedIn = false
         state.mail = null
         state.token = null
         state.user = null
         state.isAdmin = false
     }
 }
})

export const verifyToken=()=>{
  return async (dispatch) => {
    try{
      const auth=JSON.parse(localStorage.getItem("auth"))
      if(!auth){
       console.log("log out")
       dispatch(authSlice.actions.logout())
      }else{
        userAPI.check({
          headers:{"x-access-token":auth.token}
        }).then((resp) => {
          if (resp.data.auth){
           console.log("login succes")
           dispatch(authSlice.actions.loginSuccess())
         }else{
           console.log("login time out")
           dispatch(authSlice.actions.loginTimeOut())
         }
        }).catch(error => {
         console.log(error)
        })
      }
     } catch{ 
   //TODO
     }

  }

}

export const authActions = authSlice.actions
export default authSlice.reducer