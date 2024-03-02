import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { format, startOfWeek, addDays } from 'date-fns'
import DaySelector from '../daySelector/DaySelector'
import theme from '../../../../../utils/theme/theme'
import { getWeek } from '../../utils/getWeek'
import { usePlannerContext } from '../../../../../screens/planner/plannerContext/usePlannerContext'

const WeekCalender = () => {
  const { displayWeek, setDisplayWeek, setSelectedDay } = usePlannerContext()
  const weekToDisplay = getWeek(displayWeek)

  const handleMoveToPrevWeek = () => {
    const newWeek = addDays(displayWeek, -7)
    const newday = startOfWeek(newWeek, { weekStartsOn: 1 })
    setDisplayWeek(newWeek)
    setSelectedDay(newday)
  }

  const handleMoveToNextWeek = () => {
    const newWeek = addDays(displayWeek, 7)
    const newday = startOfWeek(newWeek, { weekStartsOn: 1 })
    setDisplayWeek(newWeek)
    setSelectedDay(newday)
  }

  //map week to display - inside this loop is another loop which maps the days of the week
  return weekToDisplay.map((week) => {
    const month = format(week[0], 'MMMM')
    const year = format(week[0], 'yyyy')

    return (
      <View style={styles.datePickerWrapper} key={week[0].toString()}>
        <View style={styles.monthAndWeekContainer}>
          <Text style={styles.monthName}>
            {month} {year}
          </Text>

          {/* ---------------------- move to prev week button ----------------------- */}
          <View style={styles.dayWrapper}>
            <TouchableOpacity onPress={handleMoveToPrevWeek}>
              <Image
                source={require('../../../../../../assets/left_arrow.png')}
                style={{ width: 25, height: 25, marginRight: 4 }}
              />
            </TouchableOpacity>

            {/* ---------------------- map days of the week ----------------------- */}
            {week.map((day) => {
              return <DaySelector key={day.toString()} day={day} />
            })}

            {/* ---------------------- move to next week button ----------------------- */}
            <TouchableOpacity onPress={handleMoveToNextWeek}>
              <Image
                source={require('../../../../../../assets/right_arrow.png')}
                style={{ width: 25, height: 25, marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  })
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
    paddingHorizontal: 8,
  },
  monthAndWeekContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 700,
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
})

export default WeekCalender
