import { User } from "@/utils/auth"
import { API } from "@/utils/http"

export type Activity = {
  activity_uuid?: number
  activity_name: string
  activity_creator?: User
  activity_participants?: number
  activity_notes?: string
  activity_placement?: string
  activity_views?: string
  activity_images?: Array<string>
  activity_date?: string
  activity_avatar?: string | File
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
