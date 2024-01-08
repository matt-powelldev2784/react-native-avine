import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useScheduledRounds } from '../../hooks/useScheduledRounds'
import ScheduledRoundCard from './components/ScheduledRoundCard'
import { Loading } from '../../../../../ui'
import ErrorNoData from '../errorNoData/ErrorNoData'

interface ScheduledRoundsProps {
  selectedDay: Date
  addFooter?: boolean
}

const ScheduledRounds = ({ selectedDay, addFooter }: ScheduledRoundsProps) => {
  const [isLoading, scheduledRounds] = useScheduledRounds(selectedDay)

  if (scheduledRounds.length === 0) {
    return <ErrorNoData />
  }

  if (isLoading) {
    return <Loading loadingText={'Loading scheduled rounds...'} />
  }

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
