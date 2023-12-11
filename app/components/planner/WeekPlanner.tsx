import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  subDays,
} from 'date-fns'
import theme from '../../utils/theme/theme'

const weeksToDisplay = eachWeekOfInterval(
  {
    start: subDays(new Date(), 64),
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
    const weekStartMonth = format(week[0], 'MMMM')
    const weekEndMonth = format(week[week.length - 1], 'MMMM')
    const monthString =
      weekStartMonth === weekEndMonth
        ? weekStartMonth
        : `${weekStartMonth} / ${weekEndMonth}`

    return (
      <View style={styles.datePickerWrapper} key={week[0].toString()}>
        <View style={styles.monthAndWeekContainer}>
          <Text style={styles.monthName}>{monthString}</Text>

          <View style={styles.dayWrapper}>
            <Image
              source={require('../../../assets/left_arrow.png')}
              style={{ width: 25, height: 25 }}
            />

            {week.map((day) => {
              const weekDay = format(day, 'EEEEEE')

              return (
                <View style={styles.dayContainer} key={day.toString()}>
                  <Text>{weekDay}</Text>
                  <Text>{day.getDate()}</Text>
                  <Image
                    source={require('../../../assets/dot.png')}
                    style={{ width: 5, height: 5, marginVertical: 2 }}
                  />
                </View>
              )
            })}

            <Image
              source={require('../../../assets/right_arrow.png')}
              style={{ width: 25, height: 25 }}
            />
          </View>
        </View>
      </View>
    )
  })

  return <View style={styles.conatiner}>{weekCalander}</View>
}

const styles = StyleSheet.create({
  conatiner: {
    width: '100%',
  },
  datePickerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.formFlowSecondary,
    paddingBottom: 8,
    marginBottom: 100,
    paddingHorizontal: 8,
  },
  monthAndWeekContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  monthName: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  dayWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  dayContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    width: 40,
  },
  dayContainerSelected: {
    alignItems: 'center',
    backgroundColor: theme.colors.plannerPrimary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    width: 40,
  },
})

export default WeekPlanner
