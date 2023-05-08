import axiosInstance from './axiosInstance'

const userAPI={

 getAllUsers(){
  return axiosInstance.get(`user/all`)
 },

 getUserByMail(mail){
  return axiosInstance.get(`user/get-user-by-mail/${mail}`)
 },

 getUserById(idUser){
  return axiosInstance.get(`user/get-user-by-id/${idUser}`)
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

 updateUser(data){
  return axiosInstance.post(`user/update-user`,data)
 },

 checkLoggedIn(data){
  return axiosInstance.get(`user/isLogged`,data)
 },

 checkToken(data){
  return axiosInstance.get(`user/check-pw-token`,data)
 },
 checkPassword(data){
  return axiosInstance.post(`user/check-password`,data)
 },

 passwordReset(data){
  return axiosInstance.post(`user/password-reset`,data)
 },

 passwordForgot(data){
  return axiosInstance.post(`user/password-forgot`,data)
 }

}
export default userAPI