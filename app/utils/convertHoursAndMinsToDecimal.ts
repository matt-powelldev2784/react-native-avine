export const convertTimeToDecimal = (
  hours: number,
  minutes: number,
): number => {
  const time = hours + minutes / 60
  const decimalTimeToTwoDecimalPlaces = Number(time.toFixed(2))
  return decimalTimeToTwoDecimalPlaces
}
