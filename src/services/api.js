import axios from 'axios'
import store from '../store'
import router from '../router'
import { getAccessToken, throwTokenErrorMsg } from '../utils/auth'

const apiURL = import.meta.env.VITE_BASE_URL

const api = axios.create({
  baseURL: apiURL,
  timeout: 60000,
  params: {}
})

export default api
