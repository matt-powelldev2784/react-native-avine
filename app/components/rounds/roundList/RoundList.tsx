import { View, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import RoundCard from './components/roundCard/RoudnCard'
import { getRoundsWithRelatedJobs } from '../../../db/rounds/getRoundsWithRelatedJobs'
import { RoundWithJobT } from '../../../types/RoundT'
import { Loading } from '../../../ui/'
import ErrorNoData from './components/errorData/ErrorNoData'
import { useDeviceType } from '../../../utils/deviceTypes'
import { useRoute } from '@react-navigation/native'
import theme from '../../../utils/theme/theme'

const RoundList = () => {
  const route = useRoute()
  const [isLoading, setIsLoading] = useState(true)
  const [roundData, setRoundData] = useState<RoundWithJobT[] | null>(null)
  const { isSmallWeb, isLargeWeb, isNative } = useDeviceType()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await getRoundsWithRelatedJobs()
      console.log('data', data)
      setIsLoading(false)
      setRoundData(data)
    }

    fetchData()
  }, [route])

  if (isLoading) {
    return <Loading loadingText={'Loading rounds list...'} />
  }

  if (!roundData || roundData.length === 0) {
    return <ErrorNoData />
  }
  const RoundCards = roundData?.map((round) => {
    return <RoundCard {...round} key={round.id} />
  })

  return (
    <View style={styles.listContainer}>
      {roundData && isLargeWeb ? (
        <View style={styles.largeWebCards}>{RoundCards}</View>
      ) : null}
      {roundData && isSmallWeb ? (
        <View style={styles.smallDeviceCards}>{RoundCards}</View>
      ) : null}

      {roundData && isNative ? (
        <FlatList
          style={styles.smallDeviceCards}
          data={roundData}
          renderItem={({ item }) => <RoundCard {...item} />}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={styles.flatlistFooter} />}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: 'white',
  },
  largeWebCards: {
    display: 'grid' as any,
    gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))' as any,
    width: '100vw' as any,
    justifyItems: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 20,
  },
  smallDeviceCards: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 70,
    paddingHorizontal: '2.5%',
  },
  flatlistFooter: {
    height: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 32,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    width: '100%',
    maxWidth: 270,
    margin: 8,
    gap: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default RoundList
