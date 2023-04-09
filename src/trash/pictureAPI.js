import axiosInstance from '../api/axiosInstance'
const pictureAPI={

 getPictureByProduct(idProduct){
  return axiosInstance.get(`picture/${idProduct}`)
 }
 

}
export default pictureAPI