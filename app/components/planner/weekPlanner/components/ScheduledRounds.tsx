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
    return (
      <View key={round.id} style={styles.roundConatiner}>
        {/* ---------------------- Round Title ----------------------- */}
        <View style={styles.roundShortNameContainer}>
          <Text style={styles.roundShortNameText}>{round.roundName}</Text>
        </View>

        {/* ---------------------- Jobs List ----------------------- */}
        <View style={styles.jobsList}>
          {round?.relatedJobs?.map((job) => {
            const height = Number(job.time) * 10 + 30
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
                    style={styles.jobName}
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
  roundShortNameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 10,
    width: '100%',
    height: 28,
    backgroundColor: theme.colors.primary,
  },
  roundShortNameText: {
    color: theme.colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
    justifyContent: 'space-between',
    flexGrow: 2,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
  },
  jobName: {
    color: theme.colors.secondary,
    fontSize: 16,
    height: 24,
    marginTop: 4,
    marginLeft: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 0,
    marginTop: 4,
    marginRight: 8,
    color: theme.colors.secondary,
  },
})

export default ScheduledRounds
