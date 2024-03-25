import { API } from "@/utils/http"

export type Activity = {
  activity_id?: number
  activity_name: string
  activity_duration?: number
  activity_location?: string
  activity_type?: string
  activity_participants?: number
  activity_rating?: number
  activity_notes?: string
  activity_date?: string
  activity_cost?: number
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
