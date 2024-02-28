import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import ScheduledRoundCard from './components/ScheduledRoundCard'
import NoScheduledRounds from './components/NoScheduledRounds'
import { useWeekPlannerContext } from '../../hooks/WeekPlannerContext'
import useGetApiData from '../../../../../utils/hooks/useGetApiData'
import { formatDateForDb } from '../../../../../utils/formatDateForDb'
import { getRoundsByPlannerDate } from '../../../../../db/planner/getRoundsByPlannerDate/getRoundsByPlannerDate'
import { Loading } from '../../../../../ui'
import { RoundWithRecurringFlagT } from '../../../../../types/RoundT'

interface ScheduledRoundsProps {
  addFooter?: boolean
}

type ScheduledRoundsT = RoundWithRecurringFlagT[] | []

const ScheduledRounds = ({ addFooter }: ScheduledRoundsProps) => {
  const { selectedDay } = useWeekPlannerContext()
  const selectedDayForDb = formatDateForDb(selectedDay)
  const { getApiIsLoading, data } = useGetApiData({
    apiFunction: async () => getRoundsByPlannerDate(selectedDayForDb),
    selectedDay,
  })

  const scheduledRounds = data as ScheduledRoundsT

  if (getApiIsLoading) {
    return <Loading loadingText="Loading scheduled rounds..." />
  }

  if (!scheduledRounds || scheduledRounds.length === 0) {
    return <NoScheduledRounds />
  }

  const scheduledRoundsJsx = scheduledRounds.map((round) => {
    return (
      <ScheduledRoundCard
        key={`${round.id}/recurringRound/${round.recurringRound}`}
        round={round}
      />
    )
  })

  return (
    <ScrollView style={styles.flatListContainer}>
      {scheduledRounds.length > 0 ? scheduledRoundsJsx : null}

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
