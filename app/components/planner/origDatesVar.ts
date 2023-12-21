import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  subDays,
} from 'date-fns'

export const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 28),
    end: addDays(new Date(), 364),
  },
  { weekStartsOn: 1 },
).reduce((acc: Date[][], cur) => {
  const allDays = eachDayOfInterval({ start: cur, end: addDays(cur, 6) })

  acc.push(allDays)
  return acc
}, [])
