import { format } from 'date-fns'

export const formatDateForDb = (date: Date) => {
  const dateString = format(date, 'ddMMyyyy')
  return dateString
}
