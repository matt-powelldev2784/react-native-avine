import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import theme from '../../../../../../utils/theme/theme'
import { JobWithIdT } from '../../../../../../types/JobT'
import usePlannerDateFromStorage from '../../../hooks/usePlannerDateFromStorage'
import { toggleJobIsComplete } from '../../../../../../db/jobs/toggleJobIsComplete'
import { useWeekPlanner } from '../../../hooks/WeekPlannerContext'

interface ScheduledJobCardProps {
  job: JobWithIdT
}

const ScheduledJobCard = ({ job }: ScheduledJobCardProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { setRefreshData } = useWeekPlanner()
  const plannerDate = usePlannerDateFromStorage('@plannerDate')
  const isComplete = job.isComplete
  const height = Number(job.time) * 20 + 24

  const isCompleteStyles = isComplete
    ? styles.isCompleteContainer
    : styles.notCompleteContainer

  const handleIsCompletePress = async () => {
    if (isLoading) {
      return
    }
    setIsLoading(true)
    await toggleJobIsComplete({
      jobId: job.id,
      date: plannerDate,
      isComplete: !isComplete,
    })
    setIsLoading(false)
    setRefreshData(true)
  }

  return (
    <View style={[{ height: height }, styles.jobItem]}>
      <View style={styles.completeWrapper}>
        <TouchableOpacity
          style={isCompleteStyles}
          onPress={handleIsCompletePress}
        >
          {isComplete ? (
            <Image
              source={require('../../../../../../../assets/tick_white.png')}
              style={{ width: 12, height: 12 }}
            />
          ) : (
            <Image
              source={require('../../../../../../../assets/cross_white.png')}
              style={{ width: 12, height: 12 }}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.leftContainer}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {job.jobName}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          Time: {job.time} hrs
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  jobsList: {
    marginVertical: 4,
  },
  jobItem: {
    borderRadius: 12,
    marginBottom: 4,
    marginHorizontal: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
  },
  completeWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  notCompleteContainer: {
    borderRadiusTopLeft: 8,
    borderRadiusBottomLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 23,
    height: 23,
    borderRadius: 50,
    marginVerical: 4,
    marginHorizontal: 8,
    backgroundColor: theme.colors.plannerPrimary,
  },
  isCompleteContainer: {
    borderRadiusTopLeft: 8,
    borderRadiusBottomLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 23,
    height: 23,
    borderRadius: 50,
    marginVerical: 4,
    marginHorizontal: 8,
    backgroundColor: 'green',
  },
  completeText: {
    color: theme.colors.secondary,
    fontSize: 10,
    textAlign: 'center',
    width: 60,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    flexGrow: 2,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    minWidth: 110,
  },
  text: {
    color: theme.colors.secondary,
    fontSize: 14,
    marginHorizontal: 8,
    minHeight: Platform.OS === 'web' ? 18.5 : 17.5,
  },
})

export default ScheduledJobCard
