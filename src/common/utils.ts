export function copyByJson(obj: any) {
  const newJsonFilters = JSON.stringify(obj)
  return JSON.parse(newJsonFilters)
}
