import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { RoundWithRelatedJobsT } from '../../../../../../types/RoundT'
import { JobWithIdT } from '../../../../../../types/JobT'
import theme from '../../../../../../utils/theme/theme'
import ScheduledJobCard from './ScheduledJobCard'
import { ConfirmModal } from '../../../../../../ui'
import useHandleDelete from '../hooks/useHandleDelete'

interface ScheduledRoundCardProps {
  round: RoundWithRelatedJobsT
}

const ScheduledRoundCard = ({ round }: ScheduledRoundCardProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const totalRoundtTime = round?.relatedJobs?.reduce(
    (totalTime: number, job: JobWithIdT) => totalTime + parseFloat(job.time),
    0,
  )
  const {
    handleDeletePress,
    handleDeleteAllRecurringRounds,
    handleDeleteSingleRecurringRound,
  } = useHandleDelete({ setModalVisible, round })

console.log('round', round)

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
          <TouchableOpacity
            onPress={handleDeletePress}
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

      <ConfirmModal
        modalText={`Do you want to delete all recurring rounds for ${round.roundName} or just this entry?`}
        onConfirm={handleDeleteAllRecurringRounds}
        onConfirm2={handleDeleteSingleRecurringRound}
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
        confirmButtonText={'Delete All'}
        onConfirmText2={'Delete Single'}
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
