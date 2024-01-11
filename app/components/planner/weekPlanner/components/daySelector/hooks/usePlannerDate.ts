import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { convertDbDateToPlannerDate } from '../../../../../../utils/convertDbDateToPlannerDate'
import { Dispatch, SetStateAction } from 'react'

const usePlannerDate = (setSelectedDate: Dispatch<SetStateAction<Date>>) => {
  useEffect(() => {
    const getPlannerDateFromStorage = async (): Promise<void> => {
      const plannerDate = await AsyncStorage.getItem('@newScheduledRoundDate')

      if (plannerDate) {
        const parsedPlannerDate = JSON.parse(plannerDate)
        const parsedDate = convertDbDateToPlannerDate(parsedPlannerDate)

        setSelectedDate(parsedDate)
        AsyncStorage.removeItem('@newScheduledRoundDate')
      }
    }
    getPlannerDateFromStorage()
  })
}

export default usePlannerDate
