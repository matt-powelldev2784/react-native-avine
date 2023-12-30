import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import WeekCalender from './components/WeekCalender'
import { useScheduledRounds } from './hooks/useScheduledRounds'

interface WeekPlannerProps {
  onDaySelect?: (day: Date) => void
}

const WeekPlanner = ({ onDaySelect }: WeekPlannerProps) => {
  const [displayWeek, setDisplayWeek] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date())
  const scheduledRounds = useScheduledRounds(selectedDay)

  console.log('scheduledRounds', scheduledRounds)

  return (
    <View style={styles.conatiner}>
      <WeekCalender
        displayWeek={displayWeek}
        setDisplayWeek={setDisplayWeek}
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
        onDaySelect={onDaySelect}
      />
      <View>
        <Text>Test</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    width: '100%',
  },
})

export default WeekPlanner
