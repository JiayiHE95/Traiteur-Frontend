import axiosInstance from './axiosInstance'
const orderAPI={
 
 createOrder(data){
  return axiosInstance.post(`order/create`,data)
 },
 getUserByOrder(idOrder){
  return axiosInstance.get(`order/get-user-by-order/${idOrder}`)
 },
 addOrderDetails(data){
  return axiosInstance.post(`order/add-orderdetails`,data)
 },
 changeStatus(data){
  return axiosInstance.post(`order/change-status`,data)
 },
 getOrders(idUser){
  return axiosInstance.get(`order/get-orders-by-user/${idUser}`)
 },
 getAllOrders(){
  return axiosInstance.get(`order/getall`)
 },
 getAllOrdersByFilter(param,value){
  return axiosInstance.get(`order/get-orders-by/${param}/${value}`)
 }

}
export default orderAPI