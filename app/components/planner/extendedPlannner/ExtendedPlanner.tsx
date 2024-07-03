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

  useEffect(() => {
    setDisplayWeek(new Date())
    setSelectedDay(new Date())
    setHighlightedDay(new Date())
  }, [route])

  return (
    <View>
      <WeekCalender />
      <Calender />
    </View>
  )
}

export default ExtendedPlanner
