import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  subDays,
} from 'date-fns'

const weeksToDisplay = eachWeekOfInterval(
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
  const weekCalander = weeksToDisplay.map((week) => {
    return (
      <View style={styles.weekContainer} key={week[0].toString()}>
        {week.map((day) => {
          const weekDay = format(day, 'EEEEEE')

          return (
            <View style={styles.dayContainer} key={day.toString()}>
              <Text>{weekDay}</Text>
              <Text>{day.getDate()}</Text>
            </View>
          )
        })}
      </View>
    )
  })

  return (
    <View style={styles.conatiner}>
      <Text>Planner</Text>
      {weekCalander}
    </View>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    width: '100%',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
  },
  dayContainer: {
    alignItems: 'center',
  },
})

export default WeekPlanner
