import { eachDayOfInterval, startOfWeek, endOfWeek, addWeeks } from 'date-fns'

export const getWeeks = (date: Date, numWeeks: number) => {
  const start = startOfWeek(date, { weekStartsOn: 1 })
  const end = endOfWeek(addWeeks(date, numWeeks - 1), { weekStartsOn: 1 })

  return eachDayOfInterval({ start, end })
}
