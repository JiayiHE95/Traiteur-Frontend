import axiosInstance from './axiosInstance'
const promoAPI={
 verifyPromo(codePromo){
  return axiosInstance.get(`promo/verifyPromo/${codePromo}`)
 },
 getAll(){
  return axiosInstance.get(`promo/get-all`)
 },
 update(data){
  return axiosInstance.post(`promo/update`, data)
 },
 addPromo(data){
  return axiosInstance.post(`promo/create`, data)
 },
 delete(codePromo){
  return axiosInstance.delete(`promo/delete/${codePromo}`)
 }
}
export default promoAPI