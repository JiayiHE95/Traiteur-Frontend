import axiosInstance from './axiosInstance'
const productAPI={

 getAll(){
  return axiosInstance.get(`product/all`)
 },
 getPicturesByProduct(idProduct){
  return axiosInstance.get(`product/${idProduct}/pictures`)
 },

}
export default productAPI