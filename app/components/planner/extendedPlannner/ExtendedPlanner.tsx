import { View } from 'react-native'
import React from 'react'
import Calender from './components/Calander'
import WeekCalender from './components/WeekCalander'

const ExtendedPlanner = () => {
  return (
    <View>
      <WeekCalender />
      <Calender />
    </View>
  )
}

export default ExtendedPlanner
