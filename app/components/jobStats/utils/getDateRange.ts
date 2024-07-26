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
  let startDate, endDate

  switch (option) {
    case 'This Month':
      startDate = startOfMonth(today)
      endDate = endOfMonth(today)
      break
    case 'Next Month':
      startDate = startOfMonth(addMonths(today, 1))
      endDate = endOfMonth(addMonths(today, 1))
      break
    case 'Previous Month':
      startDate = startOfMonth(subMonths(today, 1))
      endDate = endOfMonth(subMonths(today, 1))
      break
    case 'This Year':
      startDate = startOfYear(today)
      endDate = endOfYear(today)
      break
    case 'Next Year':
      startDate = startOfYear(addYears(today, 1))
      endDate = endOfYear(addYears(today, 1))
      break
    case 'Previous Year':
      startDate = startOfYear(subYears(today, 1))
      endDate = endOfYear(subYears(today, 1))
      break
    default:
      throw new Error('Invalid option')
  }

  // Format dates as 'ddMMyyyy'
  const formattedStartDate = format(startDate, 'ddMMyyyy')
  const formattedEndDate = format(endDate, 'ddMMyyyy')
  const dateRangeJsonString = JSON.stringify({
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  })

  return dateRangeJsonString
}
