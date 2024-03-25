import axios from "axios"
import { Device } from "@capacitor/device"

const env = import.meta.env

const getDevice = async () => {
  const info = await Device.getInfo()
  return info.platform
}

const getBaseUrl = async () => {
  const platform = await getDevice()
  if (platform === "ios") return "http://192.168.0.101:8000"

  if (platform === "android") {
  }
  if (platform === "web") return env.VITE_API_URL || "http://127.0.0.1:8000"
}

export const API = axios.create({
  baseURL: env.VITE_API_URL
})

export const imagesUrl = `${env.VITE_API_URL}/uploads/images`
