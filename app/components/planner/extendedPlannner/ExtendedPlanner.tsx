import { View } from 'react-native'
import React, { useEffect } from 'react'
import Calender from './components/Calander'
import WeekCalender from './components/WeekCalander'
import { usePlannerContext } from '../../../screens/planner/plannerContext/usePlannerContext'
import { useRoute } from '@react-navigation/native'

const ExtendedPlanner = () => {
  const { setDisplayWeek, setSelectedDay, setHighlightedDay } =
    usePlannerContext()
  const route = useRoute()
const displayDate = route?.params?.date || new Date()

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
