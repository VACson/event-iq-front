import { API } from "@/utils/http"

export const uploadNewImage = (image: File) => {
  const formData = new FormData()
  formData.append("file", image)
  return API.post("/images", formData)
}
