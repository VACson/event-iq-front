import { User } from "@/utils/auth"
import { API } from "@/utils/http"

export type Activity = {
  uuid?: string
  name: string
  creator?: User
  members?: Array<User>
  description?: string
  location?: string
  views?: string
  image?: string | File
  date?: string
}

type ServiceParams = {
  queryParams: Record<string, any>
}

export const createNewActivity = (activity: Activity) => {
  return API.post("/activities", activity)
}

export const fetchActivities = ({ queryParams }: ServiceParams) => {
  return API.get("/activities")
}

export const updateActivity = (uuid: string, activity: Partial<Activity>) => {
  return API.patch(`/activities/${uuid}`, activity)
}

export const joinActivity = ({ uuid }: { uuid?: string }) => {
  return API.patch(`/activities/${uuid}/join`)
}
