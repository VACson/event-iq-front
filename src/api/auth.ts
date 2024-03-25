import { User } from "@/utils/auth"
import { API } from "@/utils/http"

export const login = (user: User) => {
  return API.post("/auth/login", user)
}

export const registerUser = (user: User) => {
  return API.post("/auth/register", user)
}
