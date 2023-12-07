import { View, FlatList, StyleSheet, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import RoundCard from './roundCard/RoudnCard'
import { dummyRoundData } from './dummyRoundData/dummyRoundData'
import { getRoundsFromDb } from '../../../db/rounds/getRoundsFromDb'
import { RoundDbT } from '../../../../types/RoundT'

const RoundList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [roundData, setRoundData] = useState<RoundDbT[] | null>(null)

  const RoundCards = dummyRoundData.map((round) => {
    return <RoundCard {...round} key={round.id} />
  })

  console.log('roundData', roundData)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await getRoundsFromDb()
      setIsLoading(false)
      setRoundData(data)
    }

    fetchData()
  }, [])

  return (
    <View style={styles.list}>
      {Platform.OS === 'web' ? RoundCards : null}
      {Platform.OS === 'web' ? <View style={styles.whiteSpace} /> : null}
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
  whiteSpace: {
    display: 'flex',
    height: 100,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
  },
})

export default RoundList
