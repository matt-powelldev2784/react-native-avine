import { View, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { dummyJobsdata } from './dummyJobsdata/dummyJobsdata'
import JobCard from './jobCard/JobCard'
import { useDeviceType } from '../../../utils/deviceTypes'
import { getUserJobsFromDb } from '../../../db/jobs/getUserJobsFromDb'

const JobList = () => {
  const { isSmallWeb, isLargeWeb, isNative } = useDeviceType()
  const jobsData = getUserJobsFromDb()

  const JobCards = dummyJobsdata.map((job) => {
    return <JobCard {...job} key={job.id} />
  })

  return (
    <View style={styles.listContainer}>
      {isLargeWeb ? <View style={styles.largeWebCards}>{JobCards}</View> : null}
      {isSmallWeb ? (
        <View style={styles.smallDeviceCards}>{JobCards}</View>
      ) : null}

      {isNative ? (
        <FlatList
          style={styles.smallDeviceCards}
          data={dummyJobsdata}
          renderItem={({ item }) => <JobCard {...item} />}
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
  },
  largeWebCards: {
    display: 'grid' as any,
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' as any,
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
