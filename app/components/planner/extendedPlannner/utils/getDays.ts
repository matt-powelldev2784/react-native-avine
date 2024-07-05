import { eachDayOfInterval, addDays } from 'date-fns'

export const getDays = (date: Date, numDays: number) => {
  const start = date
  const end = addDays(date, numDays - 1)

  return eachDayOfInterval({ start, end })
}
