import { View, StyleSheet } from 'react-native'
import React from 'react'
import WeekCalender from './components/weekCalender/WeekCalender'
import ScheduledRounds from './components/scheduledRounds/ScheduledRounds'

interface WeekPlannerProps {
  addFooter?: boolean
}

const WeekPlanner = ({ addFooter }: WeekPlannerProps) => {
  if (addFooter === undefined) {
    addFooter = true
  }

  return (
    <View style={styles.conatiner}>
      <WeekCalender />
      <View style={styles.roundsContainer}>
        <ScheduledRounds addFooter={addFooter} />
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
