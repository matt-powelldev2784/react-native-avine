import { RouteProp, useRoute } from '@react-navigation/native'
import { updateRecurringEntriesWithLessThanOneYeaLeft } from '../../../../db/planner/extendedRecurringEntires/getRecurringEntriesWithLessThanOneYeaLeft'
import { useEffect, useState } from 'react'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'

type PlannerRouteT = RouteProp<RootStackParamList, 'Planner'>

const useUpdateRecurringEntires = () => {
  const [updateRecurringIsLoading, setUpdateRecurringIsLoading] =
    useState(false)
  const route = useRoute<PlannerRouteT>()

  useEffect(() => {
    const updateRecurringEntries = async () => {
      setUpdateRecurringIsLoading(true)
      await updateRecurringEntriesWithLessThanOneYeaLeft()
      setUpdateRecurringIsLoading(false)
    }
    updateRecurringEntries()
  }, [route])

  return { updateRecurringIsLoading }
}

export default useUpdateRecurringEntires
