import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import ScheduledRoundCard from './components/ScheduledRoundCard'
import NoScheduledRounds from './components/NoScheduledRounds'
import { usePlannerContext } from '../../../../../screens/planner/plannerContext/usePlannerContext'
import useGetApiData from '../../../../../utils/hooks/useGetApiData'
import { formatDateForDb } from '../../../../../utils/formatDateForDb'
import { getRoundsByPlannerDate } from '../../../../../db/planner/getRoundsByPlannerDate/getRoundsByPlannerDate'
import { Loading } from '../../../../../ui'
import { RoundWithRecurringFlagT } from '../../../../../types/RoundT'
import { useRoute } from '@react-navigation/native'

interface ScheduledRoundsProps {
  addFooter?: boolean
}

type ScheduledRoundsT = RoundWithRecurringFlagT[] | []

const ScheduledRounds = ({ addFooter }: ScheduledRoundsProps) => {
  const route = useRoute()
  const { selectedDay } = usePlannerContext()
  const selectedDayForDb = formatDateForDb(selectedDay)
  const { getApiIsLoading, data } = useGetApiData({
    apiFunction: async () => getRoundsByPlannerDate(selectedDayForDb),
    selectedDay,
    route,
  })

  const scheduledRounds = data as ScheduledRoundsT

  if (!scheduledRounds || scheduledRounds.length === 0) {
    return <NoScheduledRounds />
  }

  if (getApiIsLoading) {
    return (
      <View style={{ height: 100 }}>
        <Loading loadingText="Loading scheduled rounds..." />
      </View>
    )
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
      {!getApiIsLoading && scheduledRounds.length > 0
        ? scheduledRoundsJsx
        : null}

      {addFooter ? <View style={styles.flatlistFooter} /> : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  flatListContainer: {
    width: '100%',
    backgroundColor: 'lightgrey',
  },
  flatlistFooter: {
    height: 450,
    backgroundColor: 'lightgrey',
  },
})

export default ScheduledRounds
