import { API } from "@/utils/http"

export type Activity = {
  activity_uuid?: number
  activity_name: string
  activity_creator?: string
  activity_duration?: string
  activity_category?: string
  activity_participants?: number
  activity_notes?: string
  activity_placement?: string
  activity_views?: string
  activity_images?: Array<string>
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
