import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import theme from '../../../../../../utils/theme/theme'
import { JobWithIdT } from '../../../../../../types/JobT'
import usePlannerDateFromStorage from '../../../hooks/usePlannerDateFromStorage'
import { toggleJobIsComplete } from '../../../../../../db/jobs/toggleJobIsComplete'
import { useWeekPlannerContext } from '../../../hooks/WeekPlannerContext'

interface ScheduledJobCardProps {
  job: JobWithIdT
}

const ScheduledJobCard = ({ job }: ScheduledJobCardProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const isComplete = job.isComplete
  const { setRefreshData } = useWeekPlannerContext()
  const plannerDate = usePlannerDateFromStorage('@plannerDate')
  const timeWidth = Number(job.time) * 20 + 14
  const jobShortName = job.jobName
    .split(' ')
    .map((word): string => word[0])
    .join('')
    .substring(0, 3)

  const handleIsCompletePress = async () => {
    if (isLoading) {
      return
    }
    setIsLoading(true)
    await toggleJobIsComplete({
      jobId: job.id,
      plannerDate: plannerDate,
      isComplete: !isComplete,
    })

    setIsLoading(false)
    setRefreshData(true)
  }

  return (
    <View style={styles.jobItem}>
      <View style={styles.jobShortNameContainer}>
        <Text style={styles.jobShortNameText}>
          {jobShortName.slice(0, 1).toUpperCase()}
        </Text>
        {jobShortName.length > 1 && (
          <Text style={styles.jobShortNameText}>
            {jobShortName.slice(1, 2).toUpperCase()}
          </Text>
        )}
        {jobShortName.length > 1 && (
          <Text style={styles.jobShortNameText}>
            {jobShortName.slice(2, 3).toUpperCase()}
          </Text>
        )}
      </View>

      <View style={styles.leftContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {job.jobName}
        </Text>

        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {job.address}
        </Text>

        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {job.town}
        </Text>

        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {job.postcode}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.iconsWrapper}>
          <TouchableOpacity onPress={handleIsCompletePress}>
            {isComplete ? (
              <View style={styles.iconsContainer}>
                <View style={styles.iconsText}>
                  <Text style={styles.iconsTextBlue}>JOB</Text>
                  <Text style={styles.iconsTextBlue}>COMPLETE</Text>
                </View>
                <Image
                  source={require('../../../../../../../assets/tick_blue.png')}
                  style={styles.icon}
                />
              </View>
            ) : (
              <View style={styles.iconsContainer}>
                <View style={styles.iconsText}>
                  <Text style={styles.iconsTextGrey}>JOB</Text>
                  <Text style={styles.iconsTextGrey}>COMPLETE</Text>
                </View>
                <Image
                  source={require('../../../../../../../assets/tick_grey.png')}
                  style={styles.icon}
                />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleIsCompletePress}>
            {isComplete ? (
              <View style={styles.iconsContainer}>
                <View style={styles.iconsText}>
                  <Text style={styles.iconsTextBlue}>INVOICE</Text>
                  <Text style={styles.iconsTextBlue}>PAID</Text>
                </View>
                <Image
                  source={require('../../../../../../../assets/tick_blue.png')}
                  style={styles.icon}
                />
              </View>
            ) : (
              <View style={styles.iconsContainer}>
                <View style={styles.iconsText}>
                  <Text style={styles.iconsTextGrey}>INVOICE</Text>
                  <Text style={styles.iconsTextGrey}>PAID</Text>
                </View>
                <Image
                  source={require('../../../../../../../assets/tick_grey.png')}
                  style={styles.icon}
                />
              </View>
            )}
          </TouchableOpacity>

          <Text style={[styles.time, { width: timeWidth }]} numberOfLines={1}>
            {job.time} h&nbsp;&nbsp;
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  jobItem: {
    borderRadius: 12,
    marginBottom: 4,
    marginHorizontal: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    height: 112,
  },
  jobShortNameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 10,
    width: 28,
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  jobShortNameText: {
    color: theme.colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 28,
  },
  title: {
    fontSize: 20,
    color: theme.colors.primary,
    minHeight: 24,
  },
  text: {
    fontSize: 14,
    height: 17,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'white',
    gap: 8,
    minWidth: 110,
  },
  iconsWrapper: {
    position: 'relative',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    marginRight: 8,
  },
  iconsContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4,
    flexDirection: 'row',
  },
  iconsText: {
    flexDirection: 'column',
  },
  iconsTextBlue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'right',
  },
  iconsTextGrey: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#c8d4e3',
    textAlign: 'right',
  },
  icon: { width: 28, height: 28 },
  time: {
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#6c93bf',
    color: 'white',
    borderRadius: 8,
    height: 24,
    minWidth: 50,
    paddingTop: 4,
    textAlign: 'right',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    flexGrow: 2,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
})

export default ScheduledJobCard
