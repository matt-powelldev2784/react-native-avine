import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { RoundWithJobT } from '../../../../../../types/RoundT'
import theme from '../../../../../utils/theme/theme'
import { useDeviceType } from '../../../../../utils/deviceTypes'

const RoundCard = ({ roundName, location, frequency, jobs }: RoundWithJobT) => {
  const { isLargeWeb } = useDeviceType()

  const roundTime = jobs?.reduce((acc, job) => {
    return acc + Number(job.time)
  }, 0)
  const numOfJobs = jobs?.length
  const totalPrice = jobs?.reduce((acc, job) => {
    return acc + Number(job.price)
  }, 0)

  const roundShortName = roundName
    .split(' ')
    .map((word): string => word[0])
    .join('')
    .substring(0, 3)

  return (
    <View style={isLargeWeb ? styles.cardLargeWeb : styles.cardSmallScreen}>
      <View style={styles.jobShortNameContainer}>
        <Text style={styles.jobShortNameText}>
          <Text style={styles.jobShortNameText}>
            {roundShortName.slice(0, 1).toUpperCase()}
          </Text>
          <Text style={styles.jobShortNameText}>
            {roundShortName.slice(1, 2).toUpperCase()}
          </Text>
          <Text style={styles.jobShortNameText}>
            {roundShortName.slice(2, 3).toUpperCase()}
          </Text>
        </Text>
      </View>

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
            Total Price: £{totalPrice}
          </Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.rightText}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Jobs: {numOfJobs}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Freq: {frequency}
          </Text>
        </View>
        <Image
          source={require('../../../../../../assets/pen.png')}
          style={{ width: 25, height: 25 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardSmallScreen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    height: 110,
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
    height: 110,
    overflow: 'hidden',
    width: '100%',
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
    color: theme.colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 2,
    width: '100%',
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
    fontSize: 14,
    color: 'black',
    marginBottom: 0,
  },
})

export default RoundCard
