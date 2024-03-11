import { API } from "@/utils/http"

type User = {
  email: string
  password: string
}

export const login = (user: User) => {
  return API.post("/auth/login", user)
}
