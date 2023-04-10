import axiosInstance from './axiosInstance'

const userAPI={

 getUserByMail(mail){
  return axiosInstance.get(`user/get-user-by-mail/${mail}`)
 },
 getUserByPWToken(token){
  return axiosInstance.get(`user/get-user-by-pwtoken/${token}`)
 },
 
 connexion(data){
  return axiosInstance.post(`user/connexion`,data)
 },
 createUser(data){
  return axiosInstance.post(`user/create-user`,data)
 },
 checkLoggedIn(data){
  return axiosInstance.get(`user/isLogged`,data)
 },

 checkToken(data){
  return axiosInstance.get(`user/check-pw-token`,data)
 },

 passwordReset(data){
  return axiosInstance.post(`user/password-reset`,data)
 },

 passwordForgot(data){
  return axiosInstance.post(`user/password-forgot`,data)
 }

}
export default userAPI