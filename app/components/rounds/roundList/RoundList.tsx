import { View, FlatList, StyleSheet, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import RoundCard from './components/roundCard/RoudnCard'
import { getRoundsAndJobsFromDb } from '../../../db/rounds/getRoundsFromDb'
import { RoundWithJobT } from '../../../../types/RoundT'
import { Loading } from '../../../ui/'
import ErrorNoData from './components/errorData/ErrorNoData'

const RoundList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [roundData, setRoundData] = useState<RoundWithJobT[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await getRoundsAndJobsFromDb()
      setIsLoading(false)
      setRoundData(data)
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <Loading loadingText={'Loading rounds list...'} />
  }

  if (!roundData || roundData.length === 0) {
    return <ErrorNoData />
  }
  const RoundCards = roundData?.map((round) => {
    return <RoundCard {...round} key={round.id} />
  })

  console.log('roundData', roundData)
  console.log('isLoading', isLoading)

  return (
    <View style={styles.list}>
      {Platform.OS === 'web' ? RoundCards : null}
      {Platform.OS === 'web' ? <View style={styles.whiteSpace} /> : null}
      {Platform.OS !== 'web' ? (
        <FlatList
          style={{ width: '95%' }}
          data={roundData}
          renderItem={({ item }) => <RoundCard {...item} />}
          keyExtractor={(item) => item?.id || ''}
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
