import AsyncStorage from '@react-native-async-storage/async-storage'

export const addItemToStorage = async (key: string, item: string | Date) => {
  if (item) {
    AsyncStorage.setItem(key, JSON.stringify(item))
  }
}
