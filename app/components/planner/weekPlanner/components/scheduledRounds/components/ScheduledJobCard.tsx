import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../../../../screens/stackNavigator/StackNavigator'
import useGetApiData from '../../../../../../utils/hooks/useGetApiData'
import { getJob } from '../../../../../../db/jobs/getJob'
import { JobWithIdT } from '../../../../../../types/JobT'
import { Loading } from '../../../../../../ui'

type EditJobFormRouteProp = RouteProp<RootStackParamList, 'Planner'>

const ScheduledJobCard = () => {
  const route = useRoute<EditJobFormRouteProp>()
  console.log('route.params', route.params)
  const jobId = route?.params?.jobId ? route?.params?.jobId : ''
  console.log('jobId', jobId)

  const { getApiIsLoading, data } = useGetApiData({
    apiFunction: async () => getJob(jobId),
    route,
  })

  const jobsData = data as JobWithIdT
  console.log('jobsData', jobsData)

  if (getApiIsLoading) {
    return <Loading loadingText={'Loading job details...'} />
  }

  return (
    <View>
      <Text>ScheduledJobCard</Text>
    </View>
  )
}

export default ScheduledJobCard
