import {
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  addMonths,
  subMonths,
  addYears,
  subYears,
  format,
} from 'date-fns'

export const getDateRange = (option: string) => {
  const today = new Date()
  const nextMonth = addMonths(today, 1)
  const previousMonth = subMonths(today, 1)
  const nextYear = addYears(today, 1)
  const previousYear = subYears(today, 1)
  let startDate, endDate, title

  switch (option) {
    case 'This Month':
      startDate = startOfMonth(today)
      endDate = endOfMonth(today)
      title = format(today, 'MMMM yyyy') // e.g., "January 2023"
      break
    case 'Next Month':
      startDate = startOfMonth(nextMonth)
      endDate = endOfMonth(nextMonth)
      title = format(nextMonth, 'MMMM yyyy')
      break
    case 'Previous Month':
      startDate = startOfMonth(previousMonth)
      endDate = endOfMonth(previousMonth)
      title = format(previousMonth, 'MMMM yyyy')
      break
    case 'This Year':
      startDate = startOfYear(today)
      endDate = endOfYear(today)
      title = format(today, 'yyyy') // e.g., "2023"
      break
    case 'Next Year':
      startDate = startOfYear(nextYear)
      endDate = endOfYear(nextYear)
      title = format(nextYear, 'yyyy')
      break
    case 'Previous Year':
      startDate = startOfYear(previousYear)
      endDate = endOfYear(previousYear)
      title = format(previousYear, 'yyyy')
      break
    default:
      throw new Error('Invalid option')
  }

  // Format dates as 'ddMMyyyy'
  const formattedStartDate = format(startDate, 'ddMMyyyy')
  const formattedEndDate = format(endDate, 'ddMMyyyy')
  const dateRangeWithTitleJsonString = JSON.stringify({
    title,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  })

  return dateRangeWithTitleJsonString
}
