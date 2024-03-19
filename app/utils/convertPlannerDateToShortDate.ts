import { format } from 'date-fns'
import { convertDbDateToDateString } from './convertDbDateToDateString'

export const convertPlannerDateToShortDate = (date: string) => {
  const dateString = convertDbDateToDateString(date)
  const shortDate = format(dateString, 'dd MMMM yyyy')

  return shortDate
}
