import { View, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import JobCard from './jobCard/JobCard'
import { Loading } from '../../../ui'
import { useDeviceType } from '../../../utils/deviceTypes'
import { getUserJobsFromDb } from '../../../db/jobs/getUserJobsFromDb'
import { JobWithIdT } from '../../../../types/JobT'
import ErrorNoData from './errorNoData/ErrorNoData'
import { useRoute } from '@react-navigation/native'
import theme from '../../../utils/theme/theme'

const JobList = () => {
  const route = useRoute()
  const { isSmallWeb, isLargeWeb, isNative } = useDeviceType()
  const [isLoading, setIsLoading] = useState(true)
  const [jobsData, setJobsData] = useState<JobWithIdT[] | null | undefined>(
    null,
  )

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await getUserJobsFromDb()
      setIsLoading(false)
      setJobsData(data)
    }

    fetchData()
  }, [route])

  if (isLoading) {
    return <Loading loadingText={'Loading jobs list...'} />
  }

  if (!jobsData || jobsData.length === 0) {
    return <ErrorNoData />
  }
  const JobCards = jobsData.map((job) => {
    return <JobCard {...job} key={job.id} />
  })

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

export default JobList
