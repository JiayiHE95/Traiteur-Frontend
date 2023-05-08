import axiosInstance from './axiosInstance'
const productAPI={

 getAll(){
  return axiosInstance.get(`product/all`)
 },
 getProductById(idProduct){
  return axiosInstance.get(`product/${idProduct}/getOne`)
 },
 getPicturesByProduct(idProduct){
  return axiosInstance.get(`product/${idProduct}/pictures`)
 },

 update(data){
  return axiosInstance.post(`product/update-product`,data)
 },
 deleteProduct(idProduct){
  return axiosInstance.delete(`product/delete/${idProduct}`)
 },

 getProductsByFilter(param,value){
  return axiosInstance.get(`product/get-products-by/${param}/${value}`)
 }

}
export default productAPI