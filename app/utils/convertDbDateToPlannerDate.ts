export const convertDbDateToPlannerDate = (dbDate: string): Date => {
  const dayOfMonth = Number(dbDate.split(' ')[0])
  const month = Number(dbDate.split(' ')[1]) - 1
  const year = Number(dbDate.split(' ')[2])
  const parsedDate = new Date(year, month, dayOfMonth)

  return parsedDate
}
