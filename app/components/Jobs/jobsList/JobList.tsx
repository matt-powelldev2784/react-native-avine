import { View, FlatList, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { dummyJobsdata } from './dummyJobsdata/dummyJobsdata'
import JobCard from './jobCard/JobCard'
import { useDeviceType } from '../../../utils/deviceTypes'
import { getUserJobsFromDb } from '../../../db/jobs/getUserJobsFromDb'
import { JobT } from '../../../../types/JobT'

const JobList = () => {
  const { isSmallWeb, isLargeWeb, isNative } = useDeviceType()
  const [jobsData, setJobsData] = useState<JobT[] | null | undefined>(null)
  console.log('jobsData', jobsData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserJobsFromDb()
        console.log('data', data)
        setJobsData(data)
      } catch (error) {
        console.error('Error fetching jobs data:', error)
      }
    }

    fetchData()
  }, [])

  if (!jobsData) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    )
  }
  const JobCards = jobsData
    ? jobsData.map((job) => {
        return <JobCard {...job} key={job.id} />
      })
    : null

  return (
    <View style={styles.listContainer}>
      {jobsData && isLargeWeb ? (
        <View style={styles.largeWebCards}>{JobCards}</View>
      ) : null}
      {jobsData && isSmallWeb ? (
        <View style={styles.smallDeviceCards}>{JobCards}</View>
      ) : null}

      {jobsData && isNative ? (
        <FlatList
          style={styles.smallDeviceCards}
          data={jobsData}
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
