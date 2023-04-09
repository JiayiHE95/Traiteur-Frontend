import { createSlice } from '@reduxjs/toolkit'
import userAPI from '../api/userAPI'
import cartAPI from '../api/cartAPI'

const authReducerInit = () => {
 try {
   const auth = JSON.parse(localStorage.getItem('auth'))
   return {
     isLoggedIn: true,
     token: auth.token,
     user: auth.user,
     isAdmin:auth.user.isAdmin,
     cart:auth.cart
   }
 } catch {
   return {
     isLoggedIn: false,
     token: null,
     user: null,
     isAdmin:false,
     cart:null
   }
 }
}

const updateCart =()=>{
  let cart= JSON.parse(localStorage.getItem("cart"))
  const data={
    cart:cart.cart,
    idUser:JSON.parse(localStorage.getItem("auth")).user.idUser
  }
  cartAPI.updateCart(data).then((resp) => {
    if (resp.data){
      console.log(resp.data)
    }
  }).catch(error => {
  console.log(error)
  })
  cart && localStorage.setItem("visitorCart",JSON.stringify({cart:cart.cart}))
}

const initialState = authReducerInit();

const authSlice = createSlice({
 name: "auth",
 initialState,
 reducers: {
     loginSuccess(state) {
         const auth = JSON.parse(localStorage.getItem("auth"));
         state.isLoggedIn = true
         state.token = auth.token
         state.user = auth.user
         state.isAdmin = auth.user.isAdmin
         state.cart=auth.cart
     },

     loginTimeOut(state) {  
      updateCart()
      localStorage.removeItem('auth')
      localStorage.removeItem('cart')
      state.isLoggedIn = false
      state.token = null
      state.user = null
      state.isAdmin = false
      state.cart=null
     },

     logout(state) {
      updateCart()
      localStorage.removeItem('auth')
      localStorage.removeItem('cart')
      state.isLoggedIn = false
      state.token = null
      state.user = null
      state.isAdmin = false
      state.cart=null
     }
 }
})

export const verifyToken=()=>{
  return async (dispatch) => {
    try{
      const auth=JSON.parse(localStorage.getItem("auth"))
      if(!auth){
       console.log("log out")
       //dispatch(authSlice.actions.logout())
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