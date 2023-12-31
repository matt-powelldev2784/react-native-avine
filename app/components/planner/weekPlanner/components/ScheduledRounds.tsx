import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useScheduledRounds } from '../hooks/useScheduledRounds'
import theme from '../../../../utils/theme/theme'

interface ScheduledRoundsProps {
  selectedDay: Date
}

const ScheduledRounds = ({ selectedDay }: ScheduledRoundsProps) => {
  const scheduledRounds = useScheduledRounds(selectedDay)

  return scheduledRounds.map((round) => {
    const totalRoundtTime = round?.relatedJobs?.reduce(
      (totalTime, job) => totalTime + parseFloat(job.time),
      0,
    )

    return (
      <View key={round.id} style={styles.roundConatiner}>
        {/* ---------------------- Round Title ----------------------- */}
        <View style={styles.roundTitleContainer}>
          <Text
            style={styles.roundTitleText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {round.roundName}
          </Text>

          <Text
            style={styles.roundTimeText}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            Round Time {totalRoundtTime} hrs
          </Text>
        </View>

        {/* ---------------------- Jobs List ----------------------- */}
        <View style={styles.jobsList}>
          {round?.relatedJobs?.map((job) => {
            const height = Number(job.time) * 10 + 24
            return (
              <View key={job.id} style={[{ height: height }, styles.jobItem]}>
                <View style={styles.completeContainer}>
                  <Image
                    source={require('../../../../../assets/cross_white.png')}
                    style={{ width: 10, height: 10 }}
                  />
                </View>

                <View style={styles.leftContainer}>
                  <Text
                    style={styles.text}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {job.jobName}
                  </Text>
                </View>

                <View style={styles.rightContainer}>
                  <Text
                    style={styles.text}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Time: {job.time} hrs
                  </Text>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  })
}

const styles = StyleSheet.create({
  roundConatiner: {
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    margin: 4,
    marginTop: 8,
    marginHorizontal: 8,
  },
  roundTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 10,
    width: '100%',
    height: 28,
    backgroundColor: theme.colors.primary,
  },
  roundTitleText: {
    color: theme.colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
    width: '75%',
  },
  roundTimeText: {
    color: theme.colors.secondary,
    borderRaadiusBottomLeft: 20,
    borderRadiusBottomRight: 12,
    fontSize: 10,
    width: '25%',
    textAlign: 'right',
  },
  jobsList: {
    marginVertical: 4,
  },
  jobItem: {
    borderRadius: 12,
    marginVertical: 2,
    marginHorizontal: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
  },
  completeContainer: {
    borderRadiusTopLeft: 8,
    borderRadiusBottomLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
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
  },
})

export default ScheduledRounds
