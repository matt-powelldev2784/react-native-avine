import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { RoundWithRecurringFlagT } from '../../../../types/RoundT'
import theme from '../../../../utils/theme/theme'

interface RoundCardProps {
  round: RoundWithRecurringFlagT
}

const RoundCard = ({ round }: RoundCardProps) => {
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

  return (
    <View
      key={round.id}
      style={[styles.roundContainer, { height: roundTime * 50 }]}
    >
      {smallRound ? (
        <View style={styles.smallRoundTextContainer}>
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
              style={{ width: 16, height: 16 }}
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
    </View>
  )
}

const styles = StyleSheet.create({
  roundContainer: {
    width: '100%',
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
    justifyContent: 'center',
    width: 160,
    height: '100%',
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
})

export default RoundCard
