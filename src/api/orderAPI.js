import axiosInstance from './axiosInstance'
const orderAPI={

 getUserByMail(mail){
  return axiosInstance.get(`user/get-user-by-mail/${mail}`)
 },
 
 connexion(data){
  return axiosInstance.post(`user/connexion`,data)
 },
 createUser(data){
  return axiosInstance.post(`user/create-user`,data)
 },
 check(data){
  return axiosInstance.get(`user/isLogged`,data)
 },

}
export default orderAPI