import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useScheduledRounds } from '../../hooks/useScheduledRounds'
import { RoundWithRelatedJobsT } from '../../../../../types/RoundT'
import ScheduledRoundCard from './components/ScheduledRoundCard'

interface ScheduledRoundsProps {
  selectedDay: Date
}

interface ScheduledRoundCardProps {
  item: RoundWithRelatedJobsT
}

const ScheduledRounds = ({ selectedDay }: ScheduledRoundsProps) => {
  const scheduledRounds: RoundWithRelatedJobsT[] =
    useScheduledRounds(selectedDay)

  return (
    <FlatList
      style={styles.flatListContainer}
      data={scheduledRounds}
      keyExtractor={(round) => round.id}
      renderItem={({ item: round }: ScheduledRoundCardProps) => {
        return <ScheduledRoundCard round={round} />
      }}
      ListFooterComponent={<View style={styles.flatlistFooter} />}
    />
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
