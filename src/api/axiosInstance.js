import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/'
  //baseURL : `${process.env.REACT_API_URL}`
})

axiosInstance.interceptors.request.use(config => {
  //const state = store.getState()
  try {
    const auth = JSON.parse(localStorage.getItem('auth'))
    if (auth.token != null) {
      config.headers.Authorization = `${auth.token}`
    }
  }catch{
      //TODO
  }
  return config
})

export default axiosInstance