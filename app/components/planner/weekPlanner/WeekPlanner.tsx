import { View, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import WeekCalender from './components/weekCalender/WeekCalender'
import ScheduledRounds from './components/scheduledRounds/ScheduledRounds'
import { getPlannerDateFromStorage } from '../../../utils/getPlannerDateFromStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { WeekPlannerContext } from './hooks/WeekPlannerContext'
interface WeekPlannerProps {
  onDaySelect?: (day: Date) => void
  addFooter?: boolean
}

const WeekPlanner = ({ addFooter }: WeekPlannerProps) => {
  const [displayWeek, setDisplayWeek] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date())

  useEffect(() => {
    const getScheduledDate = async () => {
      const newScheduledDate =
        await getPlannerDateFromStorage('@newScheduledDate')

      if (newScheduledDate) {
        setSelectedDay(newScheduledDate)
        AsyncStorage.removeItem('@newScheduledDate')
      }
    }
    getScheduledDate()
  })

  const weekPlannerContextValue = {
    displayWeek,
    setDisplayWeek,
    selectedDay,
    setSelectedDay,
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
