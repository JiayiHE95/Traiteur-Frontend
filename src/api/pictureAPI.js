import axiosInstance from './axiosInstance'
const pictureAPI={

 getPictureByProduct(idProduct){
  return axiosInstance.get(`picture/${idProduct}`)
 }
 

}
export default pictureAPI