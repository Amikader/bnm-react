import axios from 'axios'

// const {auth,setAuth} = useContext(AuthContext)

let access = localStorage.getItem('access')
const API = axios.create({ 
    baseURL: 'http://127.0.0.1:8000/',
})

API.interceptors.request.use( (req) =>{
    const access = localStorage.getItem('access')
    req.headers.Authorization = `Bearer ${localStorage.getItem('access')}`
    return req
})

export default API