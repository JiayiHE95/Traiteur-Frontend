import { createSlice } from '@reduxjs/toolkit'

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
         state.isLoggedIn = true;
         state.mail = stored.mail;
         state.token = stored.token;
         state.user = stored.user[0];
     },

     loginTimeOut(state) {
         state.isLoggedIn = false;
         state.mail = null;
         state.token = null;
         state.user = null
     },

     logout(state) {
         console.log("hdsu")
         localStorage.removeItem('auth');
         state.isLoggedIn = false;
         state.mail = null;
         state.token = null;
         state.user = null
     }
 }
})

export const authActions = authSlice.actions
export default authSlice.reducer