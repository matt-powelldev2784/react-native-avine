import AsyncStorage from '@react-native-async-storage/async-storage'

export const getPlannerDateFromStorage = async (key: string) => {
  console.log('key', key)
  const plannerDateFromStorage = await AsyncStorage.getItem(key)
  let plannerDate

  console.log('plannerDateFromStorage', plannerDateFromStorage)

  if (plannerDateFromStorage) {
    const parsedPlannerDate = JSON.parse(plannerDateFromStorage)
    console.log('sddparsedPlannerDatesd', parsedPlannerDate)
  }

  console.log('plannerDate', plannerDate)

  return plannerDate
}
