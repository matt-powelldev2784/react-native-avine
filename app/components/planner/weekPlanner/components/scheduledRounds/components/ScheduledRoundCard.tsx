import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { RoundWithRecurringFlagT } from '../../../../../../types/RoundT'
import { JobWithIdT } from '../../../../../../types/JobT'
import theme from '../../../../../../utils/theme/theme'
import ScheduledJobCard from './ScheduledJobCard'
import { ConfirmModal } from '../../../../../../ui'
import useHandleDelete from '../hooks/useHandleDelete'

interface ScheduledRoundCardProps {
  round: RoundWithRecurringFlagT
}

const ScheduledRoundCard = ({ round }: ScheduledRoundCardProps) => {
  //state
  const [recurringModalVisible, setRecurringModalVisible] = useState(false)
  const [oneOffModalVisible, setOneOffModalVisible] = useState(false)

  //hooks
  const {
    handleDeletePress,
    handleDeleteOneOffRound,
    handleDeleteAllRecurringRounds,
    handleDeleteSingleRecurringRound,
    postApiIsLoading,
  } = useHandleDelete({
    setRecurringModalVisible,
    setOneOffModalVisible,
    round,
  })

  // variables
  const totalRoundtTime = round?.relatedJobs?.reduce(
    (totalTime: number, job: JobWithIdT) => totalTime + parseFloat(job.time),
    0,
  )
  const recurringRound = round?.recurringRound

  return (
    <View style={styles.roundWrapper}>
      <View style={styles.roundContainer}>
        {/* ---------------------- Round Title ----------------------- */}
        <View style={styles.roundTitleContainer}>
          <Text
            style={styles.roundTitleText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {round.roundName} {totalRoundtTime} hrs
          </Text>

          {recurringRound ? (
            <Image
              source={require('../../../../../../../assets/repeat1_white.png')}
              style={styles.recurringIcon}
            />
          ) : null}

          <TouchableOpacity
            onPress={handleDeletePress}
            style={styles.deleteIcon}
          >
            <Image
              source={require('../../../../../../../assets/bin_white.png')}
              style={{ width: 18, height: 22 }}
            />
          </TouchableOpacity>
        </View>

        {/* ---------------------- Jobs List ----------------------- */}

        {round?.relatedJobs?.map((job: JobWithIdT) => (
          <ScheduledJobCard
            key={job.id}
            job={job}
            recurringRound={recurringRound}
            roundId={round.id}
          />
        ))}
      </View>

      {/* ---------------------- Delete one off round modal ----------------------- */}
      <ConfirmModal
        modalText={`Are you sure you want to delete the ${round.roundName} one off round from the planner?`}
        onConfirm={handleDeleteOneOffRound}
        onCancel={() => setOneOffModalVisible(false)}
        visible={oneOffModalVisible}
        confirmButtonText={'Yes'}
        isLoading={postApiIsLoading}
      />

      {/* ---------------------- Delete recurring rounds modal ----------------------- */}
      <ConfirmModal
        modalText={`Please confirm deletion of ${round.roundName} round from the planner.`}
        modalText2={`Do you want to delete a single entry for this date only or all recurring entries?`}
        onConfirm={handleDeleteAllRecurringRounds}
        onConfirm2={handleDeleteSingleRecurringRound}
        onCancel={() => setRecurringModalVisible(false)}
        visible={recurringModalVisible}
        confirmButtonText={'Delete All'}
        onConfirmText2={'Delete Single'}
        isLoading={postApiIsLoading}
      />
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
    maxWidth: '70%',
  },
  roundTimeText: {
    color: theme.colors.secondary,
    borderRaadiusBottomLeft: 20,
    borderRadiusBottomRight: 12,
    fontSize: 10,
    width: '25%',
    textAlign: 'right',
  },
  deleteIcon: { position: 'absolute', right: 12 },
  recurringIcon: {
    position: 'absolute',
    left: 12,
    width: 25,
    height: 20,
  },
})

export default ScheduledRoundCard
