import { View, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import JobCard from './jobCard/JobCard'
import { Loading } from '../../../ui'
import { useDeviceType } from '../../../utils/deviceTypes'
import { getAllJobs } from '../../../db/jobs/getAllJobs'
import ErrorNoData from './errorNoData/ErrorNoData'
import theme from '../../../utils/theme/theme'
import useGetApiData from '../../../utils/hooks/useGetApiData'
import { JobWithIdT } from '../../../types/JobT'
import { useRoute } from '@react-navigation/native'

const JobList = () => {
  const route = useRoute()
  const { isSmallWeb, isLargeWeb, isNative } = useDeviceType()
  const { getApiIsLoading, data } = useGetApiData({
    apiFunction: async () => getAllJobs(),
    route,
  })

  const jobsData = data as JobWithIdT[]

  if (getApiIsLoading) {
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
