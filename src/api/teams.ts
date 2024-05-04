import { User } from "@/utils/auth"
import getRequestQueryParams from "@/utils/get-request-query-params"
import { API } from "@/utils/http"

export type Team = {
  uuid?: string
  name: string
  description?: string
  avatar?: string | File
  creator?: User
  members?: Array<User>
}

type ServiceParams = {
  queryParams: Record<string, any>
}

export const createNewTeam = (team: Team) => {
  return API.post("/teams", team)
}

export const fetchTeams = ({ queryParams }: ServiceParams) => {
  const query = getRequestQueryParams(queryParams)
  return API.get("/teams" + query)
}

export const updateTeam = (uuid: string, payload: Partial<Team>) => {
  return API.patch(`/teams/${uuid}`, payload)
}

export const joinTeam = ({ uuid }: { uuid: string }) => {
  return API.patch(`/teams/${uuid}/join`)
}
