import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import WeekCalender from './components/weekCalender/WeekCalender'
import ScheduledRounds from './components/scheduledRounds/ScheduledRounds'

import { WeekPlannerContext } from './hooks/WeekPlannerContext'
import setPlannerDate from './hooks/setPlannerDate'
interface WeekPlannerProps {
  onDaySelect?: (day: Date) => void
  addFooter?: boolean
}

const WeekPlanner = ({ addFooter }: WeekPlannerProps) => {
  const [displayWeek, setDisplayWeek] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [storedDate, setStoredDate] = useState(new Date())
  setPlannerDate({ setSelectedDay, setDisplayWeek, selectedDay })

  const weekPlannerContextValue = {
    displayWeek,
    setDisplayWeek,
    selectedDay,
    setSelectedDay,
    storedDate,
    setStoredDate,
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
