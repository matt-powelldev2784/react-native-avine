import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useScheduledRounds } from './hooks/useScheduledRounds'
import ScheduledRoundCard from './components/ScheduledRoundCard'
import { Loading } from '../../../../../ui'
import ErrorNoData from './components/NoScheduledRounds'
import { useWeekPlanner } from '../../hooks/WeekPlannerContext'

interface ScheduledRoundsProps {
  addFooter?: boolean
}

const ScheduledRounds = ({ addFooter }: ScheduledRoundsProps) => {
  const { selectedDay } = useWeekPlanner()
  const [isLoading, scheduledRounds] = useScheduledRounds(selectedDay)

  if (isLoading) {
    return <Loading loadingText={'Loading scheduled rounds...'} />
  }

  return (
    <ScrollView style={styles.flatListContainer}>
      {scheduledRounds.map((round) => (
        <ScheduledRoundCard key={round.id} round={round} />
      ))}
      {scheduledRounds.length === 0 ? <ErrorNoData /> : null}

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
