import { Preferences } from "@capacitor/preferences"

export type User = {
  email?: string
  uuid?: string
  username?: string
  avatar?: string
  description?: string
  token?: string
  joined_teams?: any[]
  joined_activities?: any[]
  created_events?: any[]
}

export const saveUserToStorage = async (payload: User) => {
  await Preferences.set({
    key: "user",
    value: JSON.stringify(payload)
  })
}

// JSON "get" example
export const getUserFromStorage = async (): Promise<User | undefined> => {
  const data = await Preferences.get({ key: "user" })

  if (!data?.value) return
  return JSON.parse(data.value)
}

export const removeUserFromStorage = async () => {
  await Preferences.remove({
    key: "user"
  })
}
