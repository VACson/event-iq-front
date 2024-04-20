export default (queryParams: Record<string, any>): string => {
  const urlSearchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(queryParams)) {
    urlSearchParams.append(key, String(value))
  }
  return `?${urlSearchParams}`
}
