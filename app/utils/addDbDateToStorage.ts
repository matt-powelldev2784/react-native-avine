import AsyncStorage from '@react-native-async-storage/async-storage'
import { formatDateForDb } from './formatDateForDb'

export const addDbDateToStorage = async (date: Date) => {
  await AsyncStorage.setItem(
    '@plannerDate',
    JSON.stringify(formatDateForDb(date)),
  )
}
