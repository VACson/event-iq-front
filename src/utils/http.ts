import axios from "axios"

const env = import.meta.env
const baseApiUrl = "http://195.238.122.150/api"

export const API = axios.create({
  baseURL: baseApiUrl
})

export const imagesUrl = `${baseApiUrl}/uploads/images`
