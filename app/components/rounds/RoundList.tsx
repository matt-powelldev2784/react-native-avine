import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import RoundCard from './roundCard/RoudnCard'
import { dummyRoundData } from './dummyRoundData/dummyRoundData'

const RoundList = () => {
  return (
    <View style={styles.list}>
      <FlatList
        style={{ width: '95%' }}
        data={dummyRoundData}
        renderItem={({ item }) => <RoundCard {...item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
})

export default RoundList
