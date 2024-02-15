import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { RoundWithRelatedJobsT } from '../../../../../../types/RoundT'
import { JobWithIdT } from '../../../../../../types/JobT'
import theme from '../../../../../../utils/theme/theme'
import ScheduledJobCard from './ScheduledJobCard'
import { removeScheduledRoundsFromDb } from '../../../../../../db/planner/removeScheduledRoundsFromDb'
import { ConfirmModal } from '../../../../../../ui'
import { getItemFromStorage } from '../../../../../../utils/getItemFromStorage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../../../screens/stackNavigator/StackNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ScheduledRoundCardProps {
  round: RoundWithRelatedJobsT
}

const ScheduledRoundCard = ({ round }: ScheduledRoundCardProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [modalVisible, setModalVisible] = useState(false)
  const totalRoundtTime = round?.relatedJobs?.reduce(
    (totalTime: number, job: JobWithIdT) => totalTime + parseFloat(job.time),
    0,
  )
  const { recurringRound } = round

  const handleDeletePress = async () => {
    if (recurringRound) {
      setModalVisible(true)
      return
    }

    const currentPlannerDate = await getItemFromStorage('@plannerDate')

    await removeScheduledRoundsFromDb({
      roundId: round.id,
      date: currentPlannerDate,
      recurringEntry: false,
      singleEntry: true,
    })

    if (currentPlannerDate) {
      AsyncStorage.setItem(
        '@newScheduledDate',
        JSON.stringify(currentPlannerDate),
      )
    }

    navigation.navigate('Planner', { refresh: true })
  }

  const handleDeleteAllRecurringRounds = async () => {
    const currentPlannerDate = await getItemFromStorage('@plannerDate')

    await removeScheduledRoundsFromDb({
      roundId: round.id,
      date: currentPlannerDate,
      recurringEntry: true,
      singleEntry: false,
    })

    if (currentPlannerDate) {
      AsyncStorage.setItem(
        '@newScheduledDate',
        JSON.stringify(currentPlannerDate),
      )
    }

    setModalVisible(false)
    navigation.navigate('Planner', { refresh: true })
  }

  const handleDeleteSingleRecurringRound = async () => {
    const currentPlannerDate = await getItemFromStorage('@plannerDate')

    await removeScheduledRoundsFromDb({
      roundId: round.id,
      date: currentPlannerDate,
      recurringEntry: true,
      singleEntry: false,
      removeAllRecurringRounds: false,
    })

    if (currentPlannerDate) {
      AsyncStorage.setItem(
        '@newScheduledDate',
        JSON.stringify(currentPlannerDate),
      )
    }

    setModalVisible(false)
    navigation.navigate('Planner', { refresh: true })
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
        cancelButtonText={'Delete Single'}
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
