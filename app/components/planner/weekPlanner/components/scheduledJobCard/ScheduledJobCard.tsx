import { View, Text } from 'react-native'
import React from 'react'
import { Loading, CustomSwitch } from '../../../../../ui'
import { usePlannerContext } from '../../../../../screens/planner/plannerContext/usePlannerContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../../../screens/stackNavigator/StackNavigator'
import { useGetJobCardData } from './hooks/useGetJobCardData'
import { StackNavigationProp } from '@react-navigation/stack'
import useFormikIsComplete from './hooks/useFormikIsComplete'

type ScheduledJobCardRouteProp = RouteProp<RootStackParamList, 'Planner'>

const ScheduledJobCard = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const route = useRoute<ScheduledJobCardRouteProp>()
  const { selectedDay, selectedJob } = usePlannerContext()

  const { getApiIsLoading, jobData, isComplete } = useGetJobCardData({
    route,
  })

  const { postApiIsLoading, formik } = useFormikIsComplete({
    isComplete,
  })

  if (!selectedJob || !selectedDay) {
    navigation.navigate('Error')
    return
  }

  if (getApiIsLoading || typeof isComplete !== 'boolean') {
    return <Loading loadingText={'Loading job details...'} />
  }

  return (
    <View>
      <CustomSwitch
        value={isComplete}
        disabled={postApiIsLoading}
        onValueChange={() => {
          formik.handleSubmit()
        }}
      />

      <Text>{jobData.jobName}</Text>
      {isComplete ? (
        <Text>Job is complete</Text>
      ) : (
        <Text>Job is not complete</Text>
      )}
    </View>
  )
}

export default ScheduledJobCard
