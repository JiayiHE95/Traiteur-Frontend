import axios from 'axios'

const axiosInstance = axios.create({
  //baseURL: 'http://localhost:5000/'
  baseURL : "http://traiteur-chinois-back.cluster-ig3.igpolytech.fr/"
})

axiosInstance.interceptors.request.use(config => {
  try {
    const auth = JSON.parse(localStorage.getItem('auth'))
    if (auth.token != null) {
      config.headers.Authorization = `${auth.token}`
    }
  }catch{ 
    console.log("error create axios")
  }
  return config
})

export default axiosInstance