import axios from 'axios'

const axiosInstance = axios.create({
  //baseURL: 'http://localhost:5000/'
  baseURL : "https://traiteur-chinois-back.cluster-ig3.igpolytech.fr/"
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