import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { RoundWithRelatedJobsT } from '../../../../../../types/RoundT'
import { JobWithIdT } from '../../../../../../types/JobT'
import theme from '../../../../../../utils/theme/theme'
import ScheduledJobCard from './ScheduledJobCard'
import { removeScheduledRounFromoDb } from '../../../../../../db/planner/removeScheduledRoundFromDb'
import usePlannerDateFromStorage from '../../../hooks/usePlannerDateFromStorage'
import { useWeekPlanner } from '../../../hooks/WeekPlannerContext'

interface ScheduledRoundCardProps {
  round: RoundWithRelatedJobsT
}

const ScheduledRoundCard = ({ round }: ScheduledRoundCardProps) => {
  const totalRoundtTime = round?.relatedJobs?.reduce(
    (totalTime: number, job: JobWithIdT) => totalTime + parseFloat(job.time),
    0,
  )
  const plannerDate = usePlannerDateFromStorage('@plannerDate')
  const { setRefreshData } = useWeekPlanner()

  const handleDeleteRound = async () => {
    await removeScheduledRounFromoDb({
      roundId: round.id,
      date: plannerDate,
    })
    setRefreshData(true)
  }

  return (
    <View key={round.id} style={styles.roundWrapper}>
      <View key={round.id} style={styles.roundContainer}>
        {/* ---------------------- Round Title ----------------------- */}
        <View style={styles.roundTitleContainer}>
          <Text
            style={styles.roundTitleText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {round.roundName} {totalRoundtTime} hrs
          </Text>
          <TouchableOpacity
            onPress={handleDeleteRound}
            style={{ position: 'absolute', right: 12 }}
          >
            <Image
              source={require('../../../../../../../assets/bin_white.png')}
              style={{ width: 18, height: 22 }}
            />
          </TouchableOpacity>
        </View>

        {/* ---------------------- Jobs List ----------------------- */}

        {round?.relatedJobs?.map((job: JobWithIdT) => (
          <ScheduledJobCard key={job.id} job={job} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  roundWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  roundContainer: {
    marginTop: 8,
    width: '100%',
    maxWidth: 700,
    paddingHorizontal: 6,
  },
  roundTitleContainer: {
    borderRadius: 12,
    marginHorizontal: 4,
    marginBottom: 4,
    height: 34,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.plannerPrimary,
  },
  roundTitleText: {
    color: theme.colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  roundTimeText: {
    color: theme.colors.secondary,
    borderRaadiusBottomLeft: 20,
    borderRadiusBottomRight: 12,
    fontSize: 10,
    width: '25%',
    textAlign: 'right',
  },
})

export default ScheduledRoundCard
