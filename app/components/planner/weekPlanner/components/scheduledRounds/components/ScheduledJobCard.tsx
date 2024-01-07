import { View, Text, Image, StyleSheet, Platform } from 'react-native'
import React from 'react'
import theme from '../../../../../../utils/theme/theme'
import { JobWithIdT } from '../../../../../../types/JobT'

interface ScheduledJobCardProps {
  job: JobWithIdT
}

const ScheduledJobCard = ({ job }: ScheduledJobCardProps) => {
  const height = Number(job.time) * 60

  return (
    <View style={[{ height: height }, styles.jobItem]}>
      <View style={styles.completeWrapper}>
        <View style={styles.completeContainer}>
          <Image
            source={require('../../../../../../../assets/cross_white.png')}
            style={{ width: 12, height: 12 }}
          />
        </View>
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
  completeContainer: {
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
