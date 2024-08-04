import { View } from 'react-native'
import React, { useEffect } from 'react'
import Calender from './components/Calander'
import WeekCalender from './components/WeekCalander'
import { usePlannerContext } from '../../../screens/planner/plannerContext/usePlannerContext'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'
import useUpdateRecurringEntires from './hooks/useUpdateRecurringEntires'
import PleaseWaitModal from '../../../ui/modal/PleaseWaitModal'

type PlannerRouteT = RouteProp<RootStackParamList, 'Planner'>

const ExtendedPlanner = () => {
  const { setDisplayWeek, setSelectedDay, setHighlightedDay } =
    usePlannerContext()
  const route = useRoute<PlannerRouteT>()
  const displayDate = route.params?.date || new Date()
  const { updateRecurringIsLoading } = useUpdateRecurringEntires()

  useEffect(() => {
    setDisplayWeek(displayDate)
    setSelectedDay(displayDate)
    setHighlightedDay(displayDate)
  }, [route])

  return (
    <View>
      <WeekCalender />
      <Calender />

      {updateRecurringIsLoading ? (
        <PleaseWaitModal
          modalText={`Please wait...`}
          modalText2={`Do not close or navigate to away from this page whilst rounds recurring rounds are being synced.`}
          modalText4={
            'This could take a few minutes if many rounds require extension.'
          }
          modalText3={
            'Recurring rounds and scheduled forward 2 years and are extendeded when they have less than 1 year left.'
          }
          visible={updateRecurringIsLoading}
          isLoading={updateRecurringIsLoading}
        />
      ) : null}
    </View>
  )
}

export default ExtendedPlanner
