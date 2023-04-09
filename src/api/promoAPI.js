import axiosInstance from './axiosInstance'
const promoAPI={
 verifyPromo(codePromo){
  return axiosInstance.get(`promo/verifyPromo/${codePromo}`)
 },

}
export default promoAPI