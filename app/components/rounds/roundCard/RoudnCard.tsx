import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { RoundTS } from '../../../../types/Round'

const RoundCard = ({ name, place, numOfJobs, roundTime }: RoundTS) => {
  return (
    <View style={styles.card}>
      <View style={styles.shortNameContainer}>
        <Text style={styles.shortName}>{name.slice(0, 1).toUpperCase()}</Text>
        <Text style={styles.shortName}>{name.slice(1, 2).toUpperCase()}</Text>
        <Text style={styles.shortName}>{name.slice(2, 3).toUpperCase()}</Text>
      </View>
      <View style={styles.leftContainer}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          Place: {place}
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
            Total Price: £{numOfJobs}
          </Text>
        </View>
        <Image
          source={require('../../../../assets/edit.png')}
          style={{ width: 25, height: 25 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 20,
    color: '#337bae',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#337bae',
    height: 100,
    overflow: 'hidden',
  },
  shortNameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 10,
    width: 30,
    height: '100%',
    backgroundColor: '#337bae',
  },
  shortName: {
    color: '#fff',
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
    color: '#337bae',
    marginBottom: 2,
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 0,
  },
})

export default RoundCard
