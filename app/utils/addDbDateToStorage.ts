import AsyncStorage from '@react-native-async-storage/async-storage'
import { formatDateForDb } from './formatDateForDb'

export const addDbDateToStorage = async (date: Date, key: string) => {
  await AsyncStorage.setItem(key, JSON.stringify(formatDateForDb(date)))
}
