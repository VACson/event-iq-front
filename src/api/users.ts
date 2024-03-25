import { API } from "@/utils/http"

export const getProfile = () => {
  return API.get("/users/me")
}

export const updateProfile = ({ uuid, payload }: any) => {
  return API.put(`/users/${uuid}`, payload)
}

export const updateProfilePhoto = ({ payload }: any) => {
  return API.post(`/images/avatar`, payload)
}
