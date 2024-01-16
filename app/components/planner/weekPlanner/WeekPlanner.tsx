import { View, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import WeekCalender from './components/weekCalender/WeekCalender'
import ScheduledRounds from './components/scheduledRounds/ScheduledRounds'
import { getPlannerDateFromStorage } from '../../../utils/getPlannerDateFromStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { WeekPlannerContext } from './hooks/WeekPlannerContext'
import { convertDbDateToPlannerDate } from '../../../utils/convertDbDateToPlannerDate'
import { formatDateForDb } from '../../../utils/formatDateForDb'
interface WeekPlannerProps {
  onDaySelect?: (day: Date) => void
  addFooter?: boolean
}

const WeekPlanner = ({ addFooter }: WeekPlannerProps) => {
  const [displayWeek, setDisplayWeek] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [refreshData, setRefreshData] = useState(false)
  console.log('selectedDay', selectedDay)

  useEffect(() => {
    const getScheduledDate = async () => {
      const newScheduledDate =
        await getPlannerDateFromStorage('@newScheduledDate')

      if (newScheduledDate) {
        const dateObject = new Date(
          convertDbDateToPlannerDate(newScheduledDate),
        )
        setSelectedDay(dateObject)
        setDisplayWeek(dateObject)
        AsyncStorage.removeItem('@newScheduledDate')
      } else {
        setSelectedDay(selectedDay)
      }
    }
    getScheduledDate()

    const setScheduledDate = async () => {
      const dbDate = formatDateForDb(selectedDay)
      AsyncStorage.setItem('@plannerDate', JSON.stringify(dbDate))
    }

    setScheduledDate()
  })

  const weekPlannerContextValue = {
    displayWeek,
    setDisplayWeek,
    selectedDay,
    setSelectedDay,
    refreshData,
    setRefreshData,
  }

  if (addFooter === undefined) {
    addFooter = true
  }

  return (
    <WeekPlannerContext.Provider value={weekPlannerContextValue}>
      <View style={styles.conatiner}>
        <WeekCalender />
        <View style={styles.roundsContainer}>
          <ScheduledRounds addFooter={addFooter} />
        </View>
      </View>
    </WeekPlannerContext.Provider>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    width: '100%',
  },
  roundsContainer: {
    width: '100%',
    alignItems: 'center',
  },
})

export default WeekPlanner
