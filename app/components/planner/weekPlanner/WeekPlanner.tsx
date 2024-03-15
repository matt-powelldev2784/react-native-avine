import { View, StyleSheet } from 'react-native'
import React from 'react'
import WeekCalender from './components/weekCalender/WeekCalender'
import ScheduledRounds from './components/scheduledRounds/ScheduledRounds'
import { ScrollView } from 'react-native-gesture-handler'
import theme from '../../../utils/theme/theme'

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
      <ScrollView contentContainerStyle={styles.roundsContainer}>
        <ScheduledRounds addFooter={addFooter} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    width: '100%',
    backgroundColor: theme.colors.backgroundGrey,
  },
  roundsContainer: {
    width: '100%',
    alignItems: 'center',
  },
})

export default WeekPlanner
