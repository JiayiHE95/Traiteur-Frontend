import { createSlice } from '@reduxjs/toolkit'

const checkoutReducerInit = () => {
 try {
  const cart = JSON.parse(localStorage.getItem('cart'))
  return {
   beforePromoPrice: 0,
   codePromo: null,
   discount: 0,
   afterPromoPrice:0,
   cart:cart
 }
} catch {
 return {
  beforePromoPrice: 0,
  codePromo: null,
  discount: 0,
  afterPromoPrice:0,
  cart:null
 }
}
}

const initialState = checkoutReducerInit()

const checkoutSlice = createSlice({
 name: "checkout",
 initialState,
 reducers: {
  addCart(state,action) {
   state.beforePromoPrice= action.payload.beforePromoPrice
   state.codePromo=action.payload.codePromo
   state.discount= action.payload.discount
   state.afterPromoPrice=action.payload.afterPromoPrice
   state.cart=action.payload.cart
  },

  removeCart(state) {  
   state.beforePromoPrice= 0
   state.codePromo=null
   state.discount= 0
   state.afterPromoPrice=0
   state.cart=null
  },
 }
})

export const checkoutActions = checkoutSlice.actions
export default checkoutSlice.reducer