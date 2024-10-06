import axios from "axios"

const env = import.meta.env
const baseApiUrl = env.VITE_APP_BASE_URL

export const API = axios.create({
  baseURL: baseApiUrl
})

export const imagesUrl = `${baseApiUrl}/uploads/images`
