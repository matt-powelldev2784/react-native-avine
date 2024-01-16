import AsyncStorage from '@react-native-async-storage/async-storage'

export const getPlannerDateFromStorage = async (key: string) => {
  const plannerDateFromStorage = await AsyncStorage.getItem(key)
  let plannerDate

  if (plannerDateFromStorage) {
    const parsedPlannerDate = JSON.parse(plannerDateFromStorage)
    plannerDate = parsedPlannerDate
  }

  return plannerDate
}
