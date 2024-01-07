import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useScheduledRounds } from '../../hooks/useScheduledRounds'
import { RoundWithRelatedJobsT } from '../../../../../types/RoundT'
import ScheduledRoundCard from './components/ScheduledRoundCard'

interface ScheduledRoundsProps {
  selectedDay: Date
  addFooter?: boolean
}

const ScheduledRounds = ({ selectedDay, addFooter }: ScheduledRoundsProps) => {
  const scheduledRounds: RoundWithRelatedJobsT[] =
    useScheduledRounds(selectedDay)

  return (
    <ScrollView style={styles.flatListContainer}>
      {scheduledRounds.map((round) => (
        <ScheduledRoundCard key={round.id} round={round} />
      ))}
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
