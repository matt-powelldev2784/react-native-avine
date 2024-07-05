import { View } from 'react-native'
import React, { useEffect } from 'react'
import Calender from './components/Calander'
import WeekCalender from './components/WeekCalander'
import { usePlannerContext } from '../../../screens/planner/plannerContext/usePlannerContext'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../../../screens/stackNavigator/StackNavigator'

type PlannerRouteT = RouteProp<RootStackParamList, 'Planner'>

const ExtendedPlanner = () => {
  const { setDisplayWeek, setSelectedDay, setHighlightedDay } =
    usePlannerContext()
  const route = useRoute<PlannerRouteT>()
  const displayDate = route.params?.date || new Date()

  useEffect(() => {
    setDisplayWeek(displayDate)
    setSelectedDay(displayDate)
    setHighlightedDay(displayDate)
  }, [route])

  return (
    <View>
      <WeekCalender />
      <Calender />
    </View>
  )
}

export default ExtendedPlanner
