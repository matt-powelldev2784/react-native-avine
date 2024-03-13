import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../../../../screens/stackNavigator/StackNavigator'
import useGetApiData from '../../../../../../utils/hooks/useGetApiData'
import { getJob } from '../../../../../../db/jobs/getJob'
import { JobWithIdT } from '../../../../../../types/JobT'
import { Loading } from '../../../../../../ui'

type EditJobFormRouteProp = RouteProp<RootStackParamList, 'ScheduledJob'>

const ScheduledJobCard = () => {
  const [jobDetails, setJobDetails] = useState<JobWithIdT | null>(null)
  const route = useRoute<EditJobFormRouteProp>()
  const jobId = route?.params?.jobId ? route?.params?.jobId : ''
  console.log('jobId', jobId)

  const { getApiIsLoading, data } = useGetApiData({
    apiFunction: async () => getJob(jobId),
    route,
  })

  const jobsData = data as JobWithIdT
  console.log('jobsData', jobsData)

  if (!getApiIsLoading) {
    return <Loading loadingText={'Loading job details...'} />
  }

  // if (getApiIsLoading) {
  //   return (
  //     <View style={{ height: 100 }}>
  //       <Loading loadingText="Loading scheduled rounds..." />
  //     </View>
  //   )
  // }

  console.log('jobDetails', jobDetails)

  return (
    <View>
      <Text>ScheduledJobCard</Text>
    </View>
  )
}

export default ScheduledJobCard
