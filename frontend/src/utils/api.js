import axios from 'axios'

// Base URL of our backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api'
})

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const user = localStorage.getItem('user')
  if (user) {
    const { token } = JSON.parse(user)
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth endpoints
export const registerUser = (data) => API.post('/auth/register', data)
export const loginUser = (data) => API.post('/auth/login', data)

// Application endpoints (we'll add more later)
export const submitApplication = (data) => API.post('/applications', data)
export const getMyApplication = () => API.get('/applications/my')
export const getAllApplications = () => API.get('/applications/all')
export const updateApplicationStatus = (id, data) => API.put(`/applications/${id}`, data)

// Solar data endpoints
export const getMySolarData = () => API.get('/solar/my')
export const getClientSolarData = (id) => API.get(`/solar/${id}`)

export default API