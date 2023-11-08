import { View, FlatList, StyleSheet, Platform, Text } from 'react-native'
import React from 'react'
import RoundCard from './roundCard/RoudnCard'
import { dummyRoundData } from './dummyRoundData/dummyRoundData'

const RoundList = () => {
  const RoundCards = dummyRoundData.map((round) => {
    return <RoundCard {...round} key={round.id} />
  })

  return (
    <View style={styles.list}>
      {Platform.OS === 'web' ? RoundCards : null}
      {Platform.OS !== 'web' ? (
        <FlatList
          style={{ width: '95%' }}
          data={dummyRoundData}
          renderItem={({ item }) => <RoundCard {...item} />}
          keyExtractor={(item) => item.id}
        />
      ) : null}
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
