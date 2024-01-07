import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import WeekCalender from './components/WeekCalender'
import ScheduledRounds from './components/ScheduledRounds'

interface WeekPlannerProps {
  onDaySelect?: (day: Date) => void
}

const WeekPlanner = ({ onDaySelect }: WeekPlannerProps) => {
  const [displayWeek, setDisplayWeek] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date())

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
        <ScheduledRounds selectedDay={selectedDay} />
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
