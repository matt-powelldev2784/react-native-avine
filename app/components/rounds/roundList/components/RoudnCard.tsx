import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { RoundWithJobT } from '../../../../types/RoundT'
import theme from '../../../../utils/theme/theme'
import { useDeviceType } from '../../../../utils/deviceTypes'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { ConfirmModal } from '../../../../ui'
import ShortNameText from '../../../../utils/shortNameText/ShortNameText'
import IconButton from '../../../../ui/iconButton/IconButton'
import { handleDeleteRound } from '../../../../db/rounds/handleDeleteRound/handleDeleteRound'

const RoundCard = ({
  id,
  roundName,
  location,
  frequency,
  relatedJobs,
}: RoundWithJobT) => {
  //state
  const [modalVisible, setModalVisible] = useState(false)

  //hooks
  const { isLargeWeb } = useDeviceType()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  //functions
  const handleEditRoundPress = () => {
    navigation.navigate('EditRound', { roundId: id })
  }

  const hanldeDeleteRoundPress = async () => {
    const deletedRound = await handleDeleteRound(id)
    const isDeleted = deletedRound?.isDeleted
    if (isDeleted) {
      navigation.navigate('Rounds', { refresh: true })
      setModalVisible(false)
    }
  }

  //variables
  const roundTime = relatedJobs?.reduce((acc, job) => {
    return acc + Number(job.time)
  }, 0)
  const numOfJobs = relatedJobs?.length
  const totalPrice = relatedJobs?.reduce((acc, job) => {
    return acc + Number(job.price)
  }, 0)

  return (
    <View style={isLargeWeb ? styles.cardLargeWeb : styles.cardSmallScreen}>
      <ShortNameText text={roundName} />

      <View style={styles.leftContainer}>
        <View>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {roundName}
          </Text>

          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Location: {location}
          </Text>
        </View>

        <View>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Round Time: {roundTime} hrs
          </Text>

          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Round Value: £{totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.rightText}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Jobs: {numOfJobs}
          </Text>

          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {frequency}
          </Text>
        </View>

        <View style={styles.buttons}>
          <IconButton
            onPress={handleEditRoundPress}
            imgSource={require('../../../../../../assets/pen.png')}
            size={35}
          />

          <IconButton
            onPress={() => {
              setModalVisible(true)
            }}
            imgSource={require('../../../../../../assets/bin.png')}
            size={35}
          />
        </View>
      </View>

      <ConfirmModal
        modalText={`Are you sure you want to delete ${roundName}?`}
        modalText2={
          'All planned occurrences of this round will be deleted from the planner. This action cannot be undone.'
        }
        onConfirm={hanldeDeleteRoundPress}
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardSmallScreen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    height: 130,
    overflow: 'hidden',
    width: '100%',
  },
  cardLargeWeb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    height: 130,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: theme.colors.white,
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
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 28,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexGrow: 2,
    padding: 8,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 8,
  },
  rightText: {
    flex: 1,
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 20,
    color: theme.colors.primary,
    marginBottom: 2,
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginBottom: 0,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})

export default RoundCard
