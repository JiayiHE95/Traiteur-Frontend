import axiosInstance from './axiosInstance'
const userAPI={
 
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
export default userAPI