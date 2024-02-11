import { convertDbDateToDateString } from './convertDbDateToDateString'
import { addDays, addWeeks, addMonths, addYears, isBefore } from 'date-fns'
import { formatDateForDb } from './formatDateForDb'

export const getRecurringDatesTwoYearsAhead = (
  startDate: string,
  frequency: string,
) => {
  const dates = []
  const convertedDateString = convertDbDateToDateString(startDate)
  let currentDate = new Date(convertedDateString)
  dates.push(formatDateForDb(currentDate))

  // Get the number from the frequency string
  const freqNum = parseInt(frequency.split(' ')[0], 10)

  // Calculate the end date (2 years later)
  const endDate = addYears(new Date(convertedDateString), 2)

  // loop over dates whilst they are between the start and end date
  while (isBefore(currentDate, endDate)) {
    // Check the frequency and add the corresponding number of days/weeks/months
    if (frequency.includes('Daily')) {
      currentDate = addDays(currentDate, freqNum)
    } else if (frequency.includes('Weekly')) {
      currentDate = addWeeks(currentDate, freqNum)
    } else if (frequency.includes('Monthly')) {
      currentDate = addMonths(currentDate, freqNum)
    }

    // Only add the date if it's before the end date
    if (isBefore(currentDate, endDate)) {
      dates.push(formatDateForDb(currentDate))
    }
  }

  console.log('dates', dates)
  return dates
}
