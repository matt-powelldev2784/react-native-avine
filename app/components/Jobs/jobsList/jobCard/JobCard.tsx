import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import React from 'react'
import { job } from '../../../../../types/Job'

const JobCard = ({
  id,
  name,
  address,
  town,
  postcode,
  cleanType,
  time,
  price,
  frequency,
}: job) => {
  return (
    <View style={styles.card}>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{id}</Text>
      </View>
      <View style={styles.leftContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {address}
          {town ? `, ${town}` : null}
        </Text>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {postcode}
        </Text>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {cleanType}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.rightText}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Time: {time}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Price: {price}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Freq: {frequency}
          </Text>
        </View>
        <Image
          source={require('../../../../../assets/edit.png')}
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
    width: Platform.OS === 'web' ? '95%' : '100%',
  },
  numberContainer: {
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 10,
    width: 30,
    height: '100%',
    backgroundColor: '#337bae',
  },
  number: {
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
  title: {
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

export default JobCard
