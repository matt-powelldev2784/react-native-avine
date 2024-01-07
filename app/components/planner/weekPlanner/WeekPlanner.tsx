import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import WeekCalender from './components/weekCalender/WeekCalender'
import ScheduledRounds from './components/scheduledRounds/ScheduledRounds'

interface WeekPlannerProps {
  onDaySelect?: (day: Date) => void
  addFooter?: boolean
}

const WeekPlanner = ({ onDaySelect, addFooter }: WeekPlannerProps) => {
  const [displayWeek, setDisplayWeek] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date())

  if (addFooter === undefined) {
    addFooter = true
  }

  return (
    <View style={styles.conatiner}>
      <WeekCalender
        selectedDay={selectedDay}
        displayWeek={displayWeek}
        setDisplayWeek={setDisplayWeek}
        setSelectedDay={setSelectedDay}
        onDaySelect={onDaySelect}
      />
      <View style={styles.roundsContainer}>
        <ScheduledRounds selectedDay={selectedDay} addFooter={addFooter} />
      </View>
    </View>
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
