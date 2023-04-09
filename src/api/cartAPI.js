import axiosInstance from './axiosInstance'
const cartAPI={

 getCart(idUser){
  return axiosInstance.get(`cart/get-cart/${idUser}`)
 },
 addProduct(data){
  return axiosInstance.post(`cart/add`,data)
 },
 updateCart(data){
  return axiosInstance.post(`cart/update`,data)
 },
 mergeCart(data){
  return axiosInstance.post(`cart/merge`,data)
 },
 deleteCart(data){
  return axiosInstance.delete(`cart/delete`,data)
 },

}
export default cartAPI