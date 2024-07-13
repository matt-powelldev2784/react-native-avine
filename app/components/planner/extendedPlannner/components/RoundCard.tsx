import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { RoundWithRecurringFlagT } from '../../../../types/RoundT'
import theme from '../../../../utils/theme/theme'
import RoundButtonWithIcon from './RoundButtonWithIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { ConfirmModal } from '../../../../ui'
import useHandleDelete from '../hooks/useHandleDeleteRound'
import { convertDbDateToDateString } from '../../../../utils/convertDbDateToDateString'
import PleaseWaitModal from '../../../../ui/modal/PleaseWaitModal'

interface RoundCardProps {
  round: RoundWithRecurringFlagT
  plannerDate: string
}

const RoundCard = ({ round, plannerDate }: RoundCardProps) => {
  //state
  const [menuIsExpanded, setMenuIsExpanded] = useState<boolean>(false)
  const [recurringModalVisible, setRecurringModalVisible] = useState(false)
  const [oneOffModalVisible, setOneOffModalVisible] = useState(false)

  //hooks
  const {
    setSelectedRound,
    setHighlightedDay,
    moveRoundState,
    setMoveRoundState,
  } = usePlannerContext()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
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
    plannerDate,
  })

  //functions
  const handleMoveRound = () => {
    setMenuIsExpanded((prev) => !prev)
    setSelectedRound({
      roundId: round.id,
      plannerDate: plannerDate,
      recurringRound: round.recurringRound,
    })
    setMoveRoundState(true)
  }
  const handleGotoTicket = () => {
    setMenuIsExpanded((prev) => !prev)
    setSelectedRound({
      roundId: round.id,
      plannerDate: plannerDate,
      recurringRound: round.recurringRound,
    })
    navigation.navigate('Planner', {
      screen: 'PlannerRoundTicketView',
    })
  }
  const handleRoundPress = () => {
    setHighlightedDay(convertDbDateToDateString(plannerDate))
    if (moveRoundState) return
    setMenuIsExpanded((prev) => !prev)
  }

  //variables
  const roundTime = round.relatedJobs?.reduce((acc, job) => {
    return acc + Number(job.time)
  }, 0)
  const numOfJobs = round.relatedJobs?.length
  const totalPrice = round.relatedJobs?.reduce((acc, job) => {
    return acc + Number(job.price)
  }, 0)
  const smallRound = roundTime * 50 < 100
  const mediumRound = roundTime * 50 > 100
  const largeRound = roundTime * 50 > 200
  const wrapperHeight = roundTime * 50
  const menuIsExpandedHeight = menuIsExpanded ? 0 : wrapperHeight

  return (
    <View
      key={round.id}
      style={[styles.roundWrapper, { minHeight: wrapperHeight }]}
    >
      <TouchableOpacity
        onPress={handleRoundPress}
        style={[styles.roundContainer, { minHeight: menuIsExpandedHeight }]}
      >
        {smallRound ? (
          <View style={[styles.smallRoundContainer]}>
            <Text
              style={styles.smallRoundTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {round.roundName}
            </Text>

            <View style={styles.roundCardLine} />

            <View style={styles.smallRoundIconContainer}>
              <Image
                source={require('../../../../../assets/clock_white.png')}
                style={{ width: 12, height: 12, margin: 4 }}
              />
              <Text style={styles.smallRoundTitle}>{roundTime} hrs</Text>
            </View>
          </View>
        ) : null}

        {mediumRound ? (
          <Image
            source={require('../../../../../assets/round.png')}
            style={{ width: 25, height: 25, marginTop: 8 }}
          />
        ) : null}

        {mediumRound ? (
          <>
            <Text style={styles.roundTitle}>{round.roundName}</Text>
            <View style={styles.iconContainer}>
              <Image
                source={require('../../../../../assets/clock_white.png')}
                style={{ width: 16, height: 16, margin: 4 }}
              />
              <Text style={styles.roundText}>{roundTime} hrs</Text>
            </View>

            <View style={styles.roundCardLine} />
          </>
        ) : null}

        {largeRound ? (
          <>
            <View style={styles.iconContainer}>
              <Image
                source={require('../../../../../assets/clipboard_tick.png')}
                style={{
                  width: 16,
                  height: 16,
                  margin: 4,
                }}
              />
              <Text style={styles.roundText}>{numOfJobs} jobs</Text>
            </View>

            <View style={styles.roundCardLine} />

            <View style={styles.iconContainer}>
              <Image
                source={require('../../../../../assets/pound_sign_white.png')}
                style={{ width: 18, height: 18, margin: 4 }}
              />
              <Text style={styles.roundText}>£ {totalPrice.toFixed(0)}</Text>
            </View>
          </>
        ) : null}
      </TouchableOpacity>

      {menuIsExpanded ? (
        <View style={styles.buttonContainer}>
          <RoundButtonWithIcon
            onPress={handleMoveRound}
            backgroundColor={theme.colors.tertiaryBlue}
            text={'Move Round'}
            width={150}
            height={35}
            icon={require('../../../../../assets/move_icon_white.png')}
          />
          <RoundButtonWithIcon
            onPress={handleGotoTicket}
            backgroundColor={theme.colors.tertiaryBlue}
            text={'Goto Ticket'}
            width={150}
            height={35}
            icon={require('../../../../../assets/notes_white.png')}
          />
          <RoundButtonWithIcon
            onPress={handleDeletePress}
            backgroundColor={'red'}
            text={'Delete Round'}
            width={150}
            height={35}
            icon={require('../../../../../assets/bin_white.png')}
          />
        </View>
      ) : null}

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
        modalText={`Please confirm deletion of ${round.roundName} recurring round from the planner.`}
        modalText2={`Do you want to delete a single entry for this date only or all recurring entries?`}
        onConfirm={handleDeleteAllRecurringRounds}
        onConfirm2={handleDeleteSingleRecurringRound}
        onCancel={() => setRecurringModalVisible(false)}
        visible={recurringModalVisible && !postApiIsLoading}
        confirmButtonText={'Delete All'}
        onConfirmText2={'Delete Single'}
        isLoading={postApiIsLoading}
      />

      {/* ---------------------- show please wait modal when recurring round is deleting ----------------------- */}
      {postApiIsLoading && round.recurringRound === true ? (
        <PleaseWaitModal
          modalText={`Please wait...`}
          modalText2={`Do not close or navigate to away from this page whilst rounds are being deleted.`}
          modalText3={
            'This could take a few minutes if a recurring round is being deleted.'
          }
          visible={postApiIsLoading}
          isLoading={postApiIsLoading}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  roundWrapper: {
    position: 'relative',
    width: 160,
    marginBottom: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 300,
  },
  roundContainer: {
    width: 160,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  smallRoundContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    minHeight: 50,
    gap: 2,
  },
  smallRoundTitle: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
    width: 120,
    height: 17,
  },
  smallRoundIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 140,
    height: 17,
  },
  roundTitle: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 2,
    marginBottom: 8,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 140,
  },
  roundText: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 2,
    marginVertical: 4,
    textAlign: 'right',
    width: 120,
  },
  roundCardLine: {
    height: 1,
    backgroundColor: theme.colors.white,
    width: '90%',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    width: '100%',
    height: 120,
    zIndex: 800,
    marginVertical: 8,
    marginHorizontal: 4,
  },
})

export default RoundCard
