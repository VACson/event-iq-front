import { API } from "@/utils/http"

export type Team = {
  uuid: string
  name: string
  description?: string
  avatar?: string
}

type ServiceParams = {
  queryParams: Record<string, any>
}

export const createNewTeam = (team: Team) => {
  return API.post("/teams", team)
}

export const fetchTeams = ({ queryParams }: ServiceParams) => {
  return API.get("/teams")
}
