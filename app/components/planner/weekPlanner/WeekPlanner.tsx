import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  eachDayOfInterval,
  format,
  startOfWeek,
  endOfWeek,
  addDays,
} from 'date-fns'
import theme from '../../../utils/theme/theme'
import { queryRoundsOnDate } from '../../../db/planner/queryRoundsOnDate'
import { formatDateForDb } from '../../../utils/formatDateForDb'

const getWeek = (date: Date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 })
  const end = endOfWeek(date, { weekStartsOn: 1 })
  return [eachDayOfInterval({ start, end })]
}

interface WeekPlannerProps {
  onDaySelect?: (day: Date) => void
}

const WeekPlanner = ({ onDaySelect }: WeekPlannerProps) => {
  const [displayWeek, setDisplayWeek] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date())
  const weekToDisplay = getWeek(displayWeek)

  useEffect(() => {
    const fetchData = async () => {
      await queryRoundsOnDate(formatDateForDb(selectedDay))
    }
    fetchData()
  }, [selectedDay])

  //map week to display - inside this loop is another loop which maps the days of the week
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
              onPress={() => {
                const newWeek = addDays(displayWeek, -7)
                setDisplayWeek(newWeek)
                setSelectedDay(startOfWeek(newWeek, { weekStartsOn: 1 }))
                onDaySelect ? onDaySelect(selectedDay) : null
              }}
            >
              <Image
                source={require('../../../../assets/left_arrow.png')}
                style={{ width: 25, height: 25, marginRight: 4 }}
              />
            </TouchableOpacity>
            {/* map days of the week */}
            {week.map((day) => {
              const weekDay = format(day, 'EEEEEE')

              return (
                <TouchableOpacity
                  style={
                    day.getDate() === selectedDay.getDate()
                      ? styles.dayContainerSelected
                      : styles.dayContainer
                  }
                  key={day.toString()}
                  onPress={() => {
                    setSelectedDay(day)
                    onDaySelect ? onDaySelect(selectedDay) : null
                  }}
                >
                  <Text
                    style={
                      day.getDate() === selectedDay.getDate()
                        ? styles.dayTextSelected
                        : null
                    }
                  >
                    {weekDay}
                  </Text>

                  <Text
                    style={
                      day.getDate() === selectedDay.getDate()
                        ? styles.dayTextSelected
                        : null
                    }
                  >
                    {day.getDate()}
                  </Text>

                  <Image
                    source={require('../../../../assets/dot.png')}
                    style={{ width: 7, height: 7, marginVertical: 2 }}
                  />
                </TouchableOpacity>
              )
            })}

            <TouchableOpacity
              onPress={() => {
                const newWeek = addDays(displayWeek, 7)
                setDisplayWeek(newWeek)
                setSelectedDay(startOfWeek(newWeek, { weekStartsOn: 1 }))
                onDaySelect ? onDaySelect(selectedDay) : null
              }}
            >
              <Image
                source={require('../../../../assets/right_arrow.png')}
                style={{ width: 25, height: 25, marginLeft: 4 }}
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
    width: Platform.OS === 'web' ? 36 : 40,
  },
  dayContainerSelected: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    width: Platform.OS === 'web' ? 36 : 40,
  },
  dayTextSelected: {
    color: theme.colors.formFlowSecondary,
    fontWeight: 'bold',
  },
})

export default WeekPlanner
