import { View, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { dummyJobsdata } from './dummyJobsdata/dummyJobsdata'
import JobCard from './jobCard/JobCard'

const JobList = () => {
  const JobCards = dummyJobsdata.map((job) => {
    return <JobCard {...job} />
  })

  return (
    <View style={styles.list}>
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
})

export default JobList
