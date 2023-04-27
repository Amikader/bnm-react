import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from 'dayjs'

const baseURL = 'http://127.0.0.1:8000/api/token/refresh/'

const accessToken = localStorage.getItem('access') ? localStorage.getItem('access') : null

const axiosInstance = axios.create({
    baseURL,
    headers: {Authorization: `Bearer ${accessToken}`}
})

export default APIintercepters