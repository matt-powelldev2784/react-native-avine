import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {
  eachDayOfInterval,
  format,
  startOfWeek,
  endOfWeek,
  addDays,
} from 'date-fns'
import theme from '../../utils/theme/theme'

const getWeek = (date: Date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 })
  const end = endOfWeek(date, { weekStartsOn: 1 })
  return [eachDayOfInterval({ start, end })]
}

const WeekPlanner = () => {
  const [displayDate, setDisplayDate] = useState(new Date())
  const weekToDisplay = getWeek(displayDate)

  const weekCalander = weekToDisplay.map((week) => {
    const month = format(week[0], 'MMMM')
    const year = format(week[0], 'yyyy')

    return (
      <View style={styles.datePickerWrapper} key={week[0].toString()}>
        <View style={styles.monthAndWeekContainer}>
          <Text style={styles.monthName}>
            {month} {year}
          </Text>

          <View style={styles.dayWrapper}>
            <TouchableOpacity
              onPress={() => setDisplayDate(addDays(displayDate, -7))}
            >
              <Image
                source={require('../../../assets/left_arrow.png')}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>

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

            <TouchableOpacity
              onPress={() => setDisplayDate(addDays(displayDate, 7))}
            >
              <Image
                source={require('../../../assets/right_arrow.png')}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
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
    paddingBottom: 4,
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
    marginVertical: 4,
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
