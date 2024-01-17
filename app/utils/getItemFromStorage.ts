import AsyncStorage from '@react-native-async-storage/async-storage'

export const getItemFromStorage = async (key: string) => {
  const storageItem = await AsyncStorage.getItem(key)
  let newItem

  if (storageItem) {
    const parsedItem = JSON.parse(storageItem)
    newItem = parsedItem
  }

  return newItem
}
