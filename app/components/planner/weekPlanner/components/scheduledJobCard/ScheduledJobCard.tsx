import { View, Text, Switch, Platform } from 'react-native'
import React from 'react'
import { Loading } from '../../../../../ui'
import { usePlannerContext } from '../../../../../screens/planner/plannerContext/usePlannerContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../../../screens/stackNavigator/StackNavigator'
import { useGetJobCardData } from './hooks/useGetJobCardData'
import { StackNavigationProp } from '@react-navigation/stack'
import useFormikIsComplete from './hooks/useFormikIsComplete'
import theme from '../../../../../utils/theme/theme'

type ScheduledJobCardRouteProp = RouteProp<RootStackParamList, 'Planner'>

const ScheduledJobCard = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const route = useRoute<ScheduledJobCardRouteProp>()
  const { selectedDay, selectedJob } = usePlannerContext()

  const { getApiIsLoading, jobData, isComplete } = useGetJobCardData({
    route,
  })

  console.log('jobData', jobData)

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
      <Text>ScheduledJobCard</Text>

      <Switch
        value={isComplete}
        onValueChange={() => formik.handleSubmit()}
        disabled={postApiIsLoading}
        trackColor={{ false: '#767577', true: theme.colors.primary }}
        thumbColor={isComplete ? 'red' : 'blue'}
        ios_backgroundColor="#3e3e3e"
        {...Platform.select({
          web: {
            activeThumbColor: 'white',
          },
        })}
      />

      {isComplete ? (
        <Text>Job is complete</Text>
      ) : (
        <Text>Job is not complete</Text>
      )}
    </View>
  )
}

export default ScheduledJobCard
