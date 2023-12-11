import { View, Text } from 'react-native'
import React from 'react'
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  subDays,
} from 'date-fns'

const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 28),
    end: addDays(new Date(), 364),
  },
  { weekStartsOn: 1 },
).reduce((acc: Date[][], cur) => {
  const allDays = eachDayOfInterval({ start: cur, end: addDays(cur, 6) })

  acc.push(allDays)
  return acc
}, [])

const WeekPlanner = () => {
  console.log(dates)

  return (
    <View>
      <Text>Planner</Text>
    </View>
  )
}

export default WeekPlanner
