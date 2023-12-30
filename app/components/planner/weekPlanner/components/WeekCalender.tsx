import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { format, startOfWeek, addDays } from 'date-fns'
import DaySelector from './DaySelector'
import theme from '../../../../utils/theme/theme'
import { getWeek } from '../utils/getWeek'

interface WeekCalenderProps {
  displayWeek: Date
  setDisplayWeek: React.Dispatch<React.SetStateAction<Date>>
  selectedDay: Date
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>
  onDaySelect?: (day: Date) => void
}

const WeekCalender = ({
  displayWeek,
  setDisplayWeek,
  selectedDay,
  setSelectedDay,
  onDaySelect,
}: WeekCalenderProps) => {
  const weekToDisplay = getWeek(displayWeek)

  const handleMoveToPrevWeek = () => {
    const newWeek = addDays(displayWeek, -7)
    const newday = startOfWeek(newWeek, { weekStartsOn: 1 })
    setDisplayWeek(newWeek)
    setSelectedDay(newday)
    onDaySelect ? onDaySelect(newday) : null
  }

  const handleMoveToNextWeek = () => {
    const newWeek = addDays(displayWeek, 7)
    const newday = startOfWeek(newWeek, { weekStartsOn: 1 })
    setDisplayWeek(newWeek)
    setSelectedDay(newday)
    onDaySelect ? onDaySelect(newday) : null
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
                source={require('../../../../../assets/left_arrow.png')}
                style={{ width: 25, height: 25, marginRight: 4 }}
              />
            </TouchableOpacity>

            {/* ---------------------- map days of the week ----------------------- */}
            {week.map((day) => {
              return (
                <DaySelector
                  key={day.toString()}
                  selectedDay={selectedDay}
                  day={day}
                  setSelectedDay={setSelectedDay}
                  onDaySelect={onDaySelect}
                />
              )
            })}

            {/* ---------------------- move to next week button ----------------------- */}
            <TouchableOpacity onPress={handleMoveToNextWeek}>
              <Image
                source={require('../../../../../assets/right_arrow.png')}
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
