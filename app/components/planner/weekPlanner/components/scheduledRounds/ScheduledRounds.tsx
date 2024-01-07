import { View, Text, StyleSheet, Image, FlatList, Platform } from 'react-native'
import React from 'react'
import { useScheduledRounds } from '../../hooks/useScheduledRounds'
import theme from '../../../../../utils/theme/theme'
import { RoundWithRelatedJobsT } from '../../../../../types/RoundT'
import { JobWithIdT } from '../../../../../types/JobT'

interface ScheduledRoundsProps {
  selectedDay: Date
}

const ScheduledRounds = ({ selectedDay }: ScheduledRoundsProps) => {
  const scheduledRounds: RoundWithRelatedJobsT[] =
    useScheduledRounds(selectedDay)

  const renderItem = ({ item: round }: { item: RoundWithRelatedJobsT }) => {
    const totalRoundtTime = round?.relatedJobs?.reduce(
      (totalTime: number, job: JobWithIdT) => totalTime + parseFloat(job.time),
      0,
    )

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
          </View>

          {/* ---------------------- Jobs List ----------------------- */}
          <FlatList
            data={round.relatedJobs}
            keyExtractor={(job) => job.id}
            renderItem={({ item: job }: { item: JobWithIdT }) => {
              const height = Number(job.time) * 60
              return (
                <View style={[{ height: height }, styles.jobItem]}>
                  <View style={styles.completeWrapper}>
                    <View style={styles.completeContainer}>
                      <Image
                        source={require('../../../../../../assets/cross_white.png')}
                        style={{ width: 12, height: 12 }}
                      />
                    </View>
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
            }}
          />
        </View>
      </View>
    )
  }

  return (
    <FlatList
      style={styles.flatListContainer}
      data={scheduledRounds}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListFooterComponent={<View style={styles.flatlistFooter} />}
    />
  )
}

const styles = StyleSheet.create({
  flatListContainer: {
    width: '100%',
  },
  roundWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  roundContainer: {
    marginTop: 8,
    width: '100%',
    maxWidth: 700,
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
  flatlistFooter: {
    height: 250,
  },
})

export default ScheduledRounds
