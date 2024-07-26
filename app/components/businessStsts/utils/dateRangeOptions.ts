import { getDateRange } from './getDateRange'

export const dateRangeOptions = [
  { label: 'This Month', value: getDateRange('This Month') },
  { label: 'Next Month', value: getDateRange('Next Month') },
  {
    label: 'Previous Month',
    value: getDateRange('Previous Month'),
  },
  { label: 'This Year', value: getDateRange('This Year') },
  { label: 'Next Year', value: getDateRange('Next Year') },
  {
    label: 'Previous Year',
    value: getDateRange('Previous Year'),
  },
]
