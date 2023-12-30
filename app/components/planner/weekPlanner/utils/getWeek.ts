import { eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns'

export const getWeek = (date: Date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 })
  const end = endOfWeek(date, { weekStartsOn: 1 })
  return [eachDayOfInterval({ start, end })]
}
