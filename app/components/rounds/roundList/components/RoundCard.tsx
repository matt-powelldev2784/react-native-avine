import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { ConfirmModal, Loading } from '../../../../ui'
import useGetApiData from '../../../../utils/hooks/useGetApiData'
import theme from '../../../../utils/theme/theme'
import DataLineItem from '../../../../ui/dataItems/DataLineItem'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { deleteRound } from '../../../../db/rounds/deleteRound'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import Button from '../../../../ui/button/Button'
import { getSingleRoundWithRelatedJobs } from '../../../../db/rounds/withRelatedJobs/getSingleRoundWithRelatedJobs'
import JobListItem from './JobListItem'

interface RoundCardProps {
  roundId: string
  setRoundCardModalVisible: (value: boolean) => void
}

const RoundCard = ({ roundId, setRoundCardModalVisible }: RoundCardProps) => {
  //state
  const [modalVisible, setModalVisible] = useState(false)

  //hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { getApiIsLoading, data: roundData } = useGetApiData({
    apiFunction: async () => getSingleRoundWithRelatedJobs(roundId),
  })
  const { postApiIsLoading, setApiFunction } = usePostApiData({
    onSuccessScreen: 'RoundMenu',
    refreshScreen: { refresh: true },
  })

  //functions
  const handleDeleteRoundPress = () => {
    setModalVisible(true)
  }
  const handleNavigateToEditRound = () => {
    setRoundCardModalVisible(false)
    navigation.navigate('EditRound', { roundId })
  }
  const handleConfirmDeleteClientPress = async () => {
    setApiFunction(() => async () => deleteRound(roundId))
  }

  // if data is null show loading state
  if (getApiIsLoading || !roundData) {
    return <Loading loadingText={'Loading round details...'} />
  }

  return (
    <View style={[styles.cardWrapperWeb]}>
      <View style={styles.cardContainer}>
        {/* --------------------------  Title Conatiner Blue  -------------------------- */}
        <View style={styles.titleContainer}>
          <Image
            source={require('../../../../../assets/round.png')}
            style={{ width: 32, height: 32, margin: 8 }}
          />

          <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
            Round Details
          </Text>
        </View>

        {/* --------------------------  Info Container White  -------------------------- */}
        <View style={styles.infoWrapper}>
          <DataLineItem name={'Round Name'} value={roundData.roundName} />
          <DataLineItem name={'Location'} value={roundData.location} />
          <DataLineItem name={'Frequency'} value={roundData.frequency} />
        </View>

        {/* -------------------------- Job List -------------------------- */}
        <View style={styles.jobListContainer}>
          <Text style={styles.titleTextBlue}>Related Jobs:</Text>
          {roundData.relatedJobs.map((job) => (
            <View style={styles.jobList} key={job.id}>
              <JobListItem
                job={job}
                setRoundCardModalVisible={setRoundCardModalVisible}
              />
            </View>
          ))}
        </View>

        {/* --------------------------  Buttons -------------------------- */}
        <View style={styles.buttonContainer}>
          <Button
            text={'Delete Round'}
            onPress={handleDeleteRoundPress}
            backgroundColor="red"
          />
          <Button text={'Edit Round'} onPress={handleNavigateToEditRound} />
        </View>
      </View>

      <View style={{ height: 100 }} />

      {/* --------------------------------  Confirm Modal --------------------------------- */}
      <ConfirmModal
        modalText={`Are you sure you want to delete round ${roundData.roundName}?`}
        modalText2={`${roundData.roundName} will be deleted from view but will still be accessible for previously created planner entries and invoices.`}
        onConfirm={handleConfirmDeleteClientPress}
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
        isLoading={postApiIsLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrapperWeb: {
    width: '100%',
    padding: 12,
    alignItems: 'center',
    marginTop: 36,
  },
  cardContainer: {
    marginTop: 8,
    width: '100%',
    maxWidth: 600,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  titleContainer: {
    padding: 16,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    width: '100%',
  },
  titleText: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  titleTextBlue: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dateTextContainer: {
    borderRadius: 12,
    backgroundColor: 'white',
    margin: 8,
  },
  dateText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
  },
  switchWrapper: {
    justifyContent: 'space-between',
    flexGrow: 2,
    padding: 8,
    marginBottom: 16,
    marginTop: 8,
  },
  line: {
    height: 1,
    backgroundColor: theme.colors.primary,
  },
  infoWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
    width: '100%',
  },
  infoTitle: {
    fontSize: 20,
    color: theme.colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 12,
  },
  jobListContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  jobList: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 20,
  },
  warningText: {
    fontSize: 14,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 16,
    marginHorizontal: 8,
  },
})

export default RoundCard
