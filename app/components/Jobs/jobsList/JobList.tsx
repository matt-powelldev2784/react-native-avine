import {
  View,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native'
import React from 'react'
import { dummyJobsdata } from './dummyJobsdata/dummyJobsdata'
import JobCard from './jobCard/JobCard'
import { useDeviceType } from '../../../utils/deviceTypes'

const JobList = () => {
  const { isSmallWeb, isLargeWeb, isNative } = useDeviceType()

  const JobCards = dummyJobsdata.map((job) => {
    return <JobCard {...job} key={job.id} />
  })

  return (
    <View style={styles.listContainer}>
      {isLargeWeb ? <View style={styles.largeWebCards}>{JobCards}</View> : null}
      {isSmallWeb ? <View style={styles.smallWebCards}>{JobCards}</View> : null}
      {isNative ? <View style={styles.smallWebCards}>{JobCards}</View> : null}

      {isNative ? (
        <FlatList
          style={{ width: '100%', paddingTop: 10, paddingBottom: 120 }}
          data={dummyJobsdata}
          renderItem={({ item }) => <JobCard {...item} />}
          keyExtractor={(item) => item.id}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  largeWebCards: {
    paddingTop: 10,
    paddingBottom: 120,
    paddingHorizontal: 24,
    flexDirection: 'row',
    width: '100vw',
    flexWrap: 'wrap',
  },
  smallWebCards: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 120,
    paddingHorizontal: '2.5%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#337bae',
    padding: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    maxWidth: 270,
    margin: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default JobList
