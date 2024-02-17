import { useEffect } from 'react'
import { getItemFromStorage } from '../../../../utils/getItemFromStorage'
import { convertDbDateToDateString } from '../../../../utils/convertDbDateToDateString'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { formatDateForDb } from '../../../../utils/formatDateForDb'

interface useAddPlannerDateFromStorageProps {
  setSelectedDay: (date: Date) => void
  setDisplayWeek: (date: Date) => void
  selectedDay: Date
}

const useAddPlannerDateFromStorage = ({
  setSelectedDay,
  setDisplayWeek,
  selectedDay,
}: useAddPlannerDateFromStorageProps) => {
  useEffect(() => {
    const getScheduledDate = async () => {
      const newScheduledDate = await getItemFromStorage('@newScheduledDate')

      if (newScheduledDate) {
        const dateObject = new Date(convertDbDateToDateString(newScheduledDate))
        setSelectedDay(dateObject)
        setDisplayWeek(dateObject)
        AsyncStorage.removeItem('@newScheduledDate')
      }
    }
    getScheduledDate()

    const setScheduledDate = async () => {
      const dbDate = formatDateForDb(selectedDay)
      AsyncStorage.setItem('@plannerDate', JSON.stringify(dbDate))
    }

    setScheduledDate()
  })
}

export default useAddPlannerDateFromStorage
