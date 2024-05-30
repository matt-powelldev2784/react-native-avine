import { View, Text, StyleSheet, Platform, Image } from 'react-native'
import React, { useState } from 'react'
import { ConfirmModal, Loading } from '../../../../ui'
import useGetApiData from '../../../../utils/hooks/useGetApiData'
import theme from '../../../../utils/theme/theme'
import DataLineItem from '../../../../ui/dataItems/DataLineItem'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import IconButton from '../../../../ui/iconButton/IconButton'
import { getRound } from '../../../../db/rounds/getRound'
import { deleteRound } from '../../../../db/rounds/deleteRound'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import Button from '../../../../ui/button/Button'

interface RoundCardProps {
  roundId: string
}

const RoundCard = ({ roundId }: RoundCardProps) => {
  //state
  const [modalVisible, setModalVisible] = useState(false)

  //hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { getApiIsLoading, data: roundData } = useGetApiData({
    apiFunction: async () => getRound(roundId),
  })
  const { postApiIsLoading, setApiFunction } = usePostApiData({
    onSuccessScreen: 'Rounds',
    refreshScreen: { refresh: true },
  })

  //functions
  const handleDeleteRoundPress = () => {
    setModalVisible(true)
  }
  const handleNavigateToEditRound = () => {
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
    <View style={styles.cardWrapperWeb}>
      <View style={styles.cardContainer}>
        {/* --------------------------  Title Conatiner Blue  -------------------------- */}
        <View style={styles.titleContainer}>
          <Image
            source={require('../../../../../assets/person_white.png')}
            style={{ width: 27, height: 32, margin: 8 }}
          />

          <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
            Round Details
          </Text>

          <View style={styles.roundIconsContainer}>
            <IconButton
              onPress={handleDeleteRoundPress}
              imgSource={require('../../../../../assets/bin_white.png')}
              size={35}
              width={20}
              height={25}
            />

            <Text />

            <IconButton
              size={34}
              imgSource={require('../../../../../assets/edit_white.png')}
              onPress={handleNavigateToEditRound}
            />
          </View>
        </View>

        {/* --------------------------  Info Conatiner White  -------------------------- */}
        <View style={styles.infoWrapper}>
          <DataLineItem name={'Round Name'} value={roundData.roundName} />
          <DataLineItem name={'Location'} value={roundData.location} />
          <DataLineItem name={'Frequency'} value={roundData.frequency} />
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
    backgroundColor: theme.colors.backgroundGrey,
    alignItems: 'center',
  },
  cardContainer: {
    marginTop: 8,
    width: '100%',
    maxWidth: 700,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
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
  roundIconsContainer: {
    position: 'absolute',
    top: 8,
    paddingHorizontal: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Platform.OS === 'web' ? '96%' : '100%',
    height: 40,
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
  infoWrapper: { padding: 8, marginBottom: 24, width: '100%' },
  infoTitle: {
    fontSize: 20,
    color: theme.colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 12,
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
