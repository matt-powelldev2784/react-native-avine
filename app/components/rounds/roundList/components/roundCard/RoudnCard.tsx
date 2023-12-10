import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import React from 'react'
import { RoundWithJobT } from '../../../../../../types/RoundT'
import theme from '../../../../../utils/theme/theme'

const RoundCard = ({ roundName, location, frequency, jobs }: RoundWithJobT) => {
  const roundTime = jobs?.reduce((acc, job) => {
    return acc + Number(job.time)
  }, 0)
  const numOfJobs = jobs?.length
  const totalPrice = jobs?.reduce((acc, job) => {
    return acc + Number(job.price)
  }, 0)

  return (
    <View style={styles.card}>
      <View style={styles.shortNameContainer}>
        <Text style={styles.shortName}>
          {roundName.slice(0, 1).toUpperCase()}
        </Text>
        <Text style={styles.shortName}>
          {roundName.slice(1, 2).toUpperCase()}
        </Text>
        <Text style={styles.shortName}>
          {roundName.slice(2, 3).toUpperCase()}
        </Text>
      </View>

      <View style={styles.leftContainer}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {roundName}
        </Text>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          Location: {location}
        </Text>
        <View>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Round Time: {roundTime}
          </Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.rightText}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Jobs: {numOfJobs}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Total Price: £{totalPrice}
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
  pageTitle: {
    fontSize: 20,
    color: theme.colors.primary,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginBottom: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    height: 100,
    overflow: 'hidden',
    width: Platform.OS === 'web' ? '95%' : '100%',
  },
  shortNameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 10,
    width: 30,
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  shortName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
