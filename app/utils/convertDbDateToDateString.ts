export const convertDbDateToDateString = (dbDate: string): Date => {
  const dayOfMonth = Number(dbDate.substring(0, 2))
  const month = Number(dbDate.substring(2, 4)) - 1
  const year = Number(dbDate.substring(4))
  const parsedDate = new Date(year, month, dayOfMonth)

  return parsedDate
}
