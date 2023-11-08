import { View, FlatList, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { dummyJobsdata } from './dummyJobsdata/dummyJobsdata'
import JobCard from './jobCard/JobCard'

const JobList = () => {
  const JobCards = dummyJobsdata.map((job) => {
    return <JobCard {...job} key={job.id} />
  })

  return (
    <View style={styles.list}>
      {Platform.OS === 'web' ? JobCards : null}
      {Platform.OS === 'web' ? <View style={styles.whiteSpace}></View> : null}
      <FlatList
        style={{ width: '95%' }}
        data={dummyJobsdata}
        renderItem={({ item }) => <JobCard {...item} />}
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
  whiteSpace: {
    display: 'flex',
    height: 100,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
  },
})

export default JobList
