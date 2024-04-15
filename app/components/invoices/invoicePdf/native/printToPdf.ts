import * as Print from 'expo-print'
import { shareAsync } from 'expo-sharing'

const convertMilimetersToPoints = (milimeters: number) => {
  const points = (milimeters / 25.4) * 72
  const pointsRounded = Number(points.toFixed())
  return pointsRounded
}

export const printToPdf = async (html: string) => {
  const { uri } = await Print.printToFileAsync({
    html,
    width: convertMilimetersToPoints(210),
    height: convertMilimetersToPoints(297),
  })
  console.log('File has been saved to:', uri)
  await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
}
