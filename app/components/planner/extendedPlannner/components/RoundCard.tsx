import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { RoundWithRecurringFlagT } from '../../../../types/RoundT'
import theme from '../../../../utils/theme/theme'
import ButtonWithIcon from '../../../../ui/button/ButtonWithIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface RoundCardProps {
  round: RoundWithRecurringFlagT
}

const RoundCard = ({ round }: RoundCardProps) => {
  //state
  const [menuIsExpanded, setMenuIsExpanded] = useState<boolean>(false)

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

  return (
    <TouchableOpacity
      key={round.id}
      style={[styles.roundContainer, { height: conatinerHeight }]}
      onPress={() => setMenuIsExpanded((prev) => !prev)}
    >
      {smallRound ? (
        <View style={[styles.smallRoundTextContainer, smallRoundStyle]}>
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

      {menuIsExpanded ? (
        <View style={styles.buttonContainer}>
          <ButtonWithIcon
            onPress={() => setMenuIsExpanded((prev) => !prev)}
            backgroundColor={theme.colors.tertiaryBlue}
            text={'Move Round'}
            width={150}
            height={30}
            icon={require('../../../../../assets/move_icon_white.png')}
          />
          <ButtonWithIcon
            onPress={() => setMenuIsExpanded((prev) => !prev)}
            backgroundColor={theme.colors.tertiaryBlue}
            text={'Goto Ticket'}
            width={150}
            height={30}
            icon={require('../../../../../assets/notes_white.png')}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  roundContainer: {
    width: 160,
    marginBottom: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  smallRoundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
    padding: 8,
    gap: 8,
  },
  smallRoundTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 160,
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
