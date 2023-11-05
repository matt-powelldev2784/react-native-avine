import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import Dashboard from '../components/dashboard/Dashboard'

const Rounds = () => {
  const name = 'John Smith'
  const address = '123 Fake Street'
  const postcode = 'AB1 2CD'
  const cleanType = 'Front'
  const price = '£20'
  const time = '1.5'

  return (
    <>
      <Dashboard>
        <Text style={styles.pageTitle}>Rounds</Text>

        <View style={styles.card}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>1</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.text}>{address}</Text>
            <Text style={styles.text}>{postcode}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.text}>Clean Type: {cleanType}</Text>
            <Text style={styles.text}>Time: {time}</Text>
            <Text style={styles.text}>Price: {price}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>1</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.text}>{address}</Text>
            <Text style={styles.text}>{postcode}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.text}>Clean Type: {cleanType}</Text>
            <Text style={styles.text}>Time: {time}</Text>
            <Text style={styles.text}>Price: {price}</Text>
          </View>
        </View>
      </Dashboard>
    </>
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
    borderRadius: 10,
    marginBottom: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#337bae',
    width: '95%',
    maxHeight: 100,
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
    padding: 8,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 8,
  },
  title: {
    fontSize: 20,
    color: '#337bae',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
})

export default Rounds
