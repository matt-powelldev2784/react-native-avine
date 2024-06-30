import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { RoundWithRecurringFlagT } from '../../../../types/RoundT'
import theme from '../../../../utils/theme/theme'
import ButtonWithIcon from '../../../../ui/button/ButtonWithIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'

interface RoundCardProps {
  round: RoundWithRecurringFlagT
  plannerDate: string
}

const RoundCard = ({ round, plannerDate }: RoundCardProps) => {
  //state
  const [menuIsExpanded, setMenuIsExpanded] = useState<boolean>(false)

  //hooks
  const { setSelectedRound } = usePlannerContext()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  //functions
  const handleMoveRound = () => {
    setMenuIsExpanded((prev) => !prev)
    setSelectedRound({
      roundId: round.id,
      plannerDate: plannerDate,
      recurringRound: round.recurringRound,
    })
  }
  const handleGotoTicket = () => {
    setMenuIsExpanded((prev) => !prev)
    setSelectedRound({
      roundId: round.id,
      plannerDate: plannerDate,
      recurringRound: round.recurringRound,
    })
    console.log('a')
    navigation.navigate('Planner', {
      screen: 'PlannerRoundTicketView',
    })
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
  const menuIsExpandedSmallRoundHeight =
    smallRound && menuIsExpanded && roundTime < 4 ? 135 : 0
  const menuIsExpandedMediumRoundHeight =
    mediumRound && menuIsExpanded && roundTime < 4 ? 25 : 0
  const smallRoundStyle: ViewStyle =
    menuIsExpanded && roundTime < 4
      ? { paddingTop: 8, justifyContent: 'flex-start' }
      : { paddingTop: 0, justifyContent: 'center', height: '100%' }
  const conatinerHeight =
    roundTime * 50 +
    menuIsExpandedSmallRoundHeight +
    menuIsExpandedMediumRoundHeight
  const buttonHeight = !menuIsExpanded ? conatinerHeight : '100%'

  return (
    <View
      key={round.id}
      style={[styles.roundContainer, { height: conatinerHeight }]}
    >
      <TouchableOpacity
        onPress={() => setMenuIsExpanded((prev) => !prev)}
        style={[styles.roundContainer, { height: buttonHeight }]}
      >
        {smallRound ? (
          <View style={[styles.smallRoundContainer, smallRoundStyle]}>
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
          <ButtonWithIcon
            onPress={handleMoveRound}
            backgroundColor={theme.colors.tertiaryBlue}
            text={'Move Round'}
            width={150}
            height={30}
            icon={require('../../../../../assets/move_icon_white.png')}
          />
          <ButtonWithIcon
            onPress={handleGotoTicket}
            backgroundColor={theme.colors.tertiaryBlue}
            text={'Goto Ticket'}
            width={150}
            height={30}
            icon={require('../../../../../assets/notes_white.png')}
          />
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  roundContainer: {
    width: 160,
    marginBottom: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    overflow: 'hidden',
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  roundButton: {
    width: 160,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallRoundContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: '100%',
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
    marginTop: 16,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
  },
})

export default RoundCard
