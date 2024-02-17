import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useScheduledRounds } from './hooks/useScheduledRounds'
import ScheduledRoundCard from './components/ScheduledRoundCard'
import NoScheduledRounds from './components/NoScheduledRounds'
import { useWeekPlannerContext } from '../../hooks/WeekPlannerContext'
import DataError from './components/DataError'
interface ScheduledRoundsProps {
  addFooter?: boolean
}

const ScheduledRounds = ({ addFooter }: ScheduledRoundsProps) => {
  const { selectedDay } = useWeekPlannerContext()
  const [isError, scheduledRounds] = useScheduledRounds({ selectedDay })

  if (isError) {
    return <DataError />
  }

  return (
    <ScrollView style={styles.flatListContainer}>
      {scheduledRounds.map((round) => (
        <ScheduledRoundCard key={round.id} round={round} />
      ))}
      {scheduledRounds.length === 0 ? <NoScheduledRounds /> : null}

      {addFooter ? <View style={styles.flatlistFooter} /> : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  flatListContainer: {
    width: '100%',
  },
  flatlistFooter: {
    height: 250,
  },
})

export default ScheduledRounds
